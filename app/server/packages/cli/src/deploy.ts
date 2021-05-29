import { command, Options } from 'execa';
import { red, green, yellow } from 'chalk';
import ora from 'ora';
import { genPrefix, IDeploy } from '.';

const customCommand = (
  cmd: string,
  prefix: string,
  options?: Options,
  catchErr?: string
) =>
  command(cmd, options).catch(reason => {
    throw `${prefix} ${(catchErr && catchErr) || reason.message}`;
  });

export = async (argv: IDeploy): Promise<void> => {
  const Jobs: Array<null | (() => Promise<string>)> = [];
  if (argv.secrets) {
    const deleteSecretTemplate = (name: string) =>
      `kubectl delete secret ${name} --ignore-not-found`;
    const createSecretTemplate = (name: string, from: string) =>
      `kubectl create secret generic ${name} ${from}`;
    const { stdout } = await command(
      "lerna ls --all --json --ignore '@anass-nadir/*'"
    ).catch(({ message, exitCode }) => {
      console.error(message);
      process.exit(exitCode);
    });
    const services = JSON.parse(stdout);
    for (const service of services) {
      Jobs.push(async () => {
        const { location } = service;
        const serviceName = location.split('/').pop();
        const prefix = genPrefix(`Secrets:${serviceName}`);
        const serviceEnv = `${location}/.env.development.local`;
        await customCommand(
          `ls ${serviceEnv}`,
          prefix,
          {},
          `👉 ${serviceEnv} doesn't exist. 😃`
        );
        await customCommand(deleteSecretTemplate(`${serviceName}.env`), prefix);
        await customCommand(
          createSecretTemplate(
            `${serviceName}.env`,
            `--from-env-file=${serviceEnv}`
          ),
          prefix
        );
        if (serviceName !== 'client') {
          const serviceDbEnv = `${location}/.env.development-db.local`;
          await customCommand(
            `ls ${serviceDbEnv}`,
            prefix,
            {},
            `👉 ${serviceDbEnv} doesn't exist. 😃`
          );
          await customCommand(
            deleteSecretTemplate(`${serviceName}-db.env`),
            prefix
          );
          await customCommand(
            createSecretTemplate(
              `${serviceName}-db.env`,
              `--from-env-file=${serviceDbEnv}`
            ),
            prefix
          );
        }
        return `${prefix} ${serviceName} secrets deployed successfully 🚀`;
      });
    }
    Jobs.push(async () => {
      const prefix = genPrefix(`Secrets:jwt-keys`);
      await customCommand(deleteSecretTemplate(`jwt-keys`), prefix);
      await customCommand(
        `openssl genrsa -out JWT_SECRET_PRIV 2048 &&
         openssl rsa -in JWT_SECRET_PRIV -outform PEM -pubout -out JWT_SECRET`,
        prefix,
        { shell: true }
      );
      await customCommand(
        createSecretTemplate(
          `jwt-keys`,
          `--from-file=JWT_SECRET_PRIV --from-file=JWT_SECRET`
        ),
        prefix
      );
      await customCommand('rm -f JWT_SECRET_PRIV JWT_SECRET', prefix);

      return `${prefix} jwt-keys deployed successfully 🚀`;
    });
  }
  if (argv.databases) {
    Jobs.push(async () => {
      const prefix = genPrefix(`Databases`);
      await customCommand(
        `kubectl apply -f ${process.cwd()}/infra/k8s/dev/databases/`,
        prefix
      );
      return `${prefix} Databases deployed successfully 🚀`;
    });
  }
  if (argv.services) {
    Jobs.push(async () => {
      const prefix = genPrefix(`Services`);
      await customCommand(
        `kubectl apply -f ${process.cwd()}/infra/k8s/dev/services/`,
        prefix
      );
      return `${prefix} Services deployed successfully 🚀`;
    });
  }
  const spinner = ora().start();
  if (Jobs.length)
    return await Promise.allSettled(Jobs.map(job => job && job())).then(res => {
      res.forEach(rs => {
        if (rs.status === 'fulfilled')
          return spinner.succeed(green(String(rs.value)));
        spinner.fail(red(rs.reason));
      });
    });
  spinner.warn(yellow('Nothing to deploy please try this command with --help'));
};
