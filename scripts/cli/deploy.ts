/* eslint-disable security/detect-child-process */
/* eslint-disable import/no-extraneous-dependencies */

import { promisify } from 'util';
import { exec } from 'child_process';
import { blue, red, blueBright, green } from 'chalk';
import ora from 'ora';
import { access } from 'fs/promises';
import type { IDeploy } from '.';

const execAsync = promisify(exec);

export = async (argv: IDeploy): Promise<void> => {
  if (argv.secrets) {
    const checkingSpinner = ora({ prefixText: 'secrets' }).start(
      blue(`Starting secrets deployments 🤫`)
    );
    const deleteSecretTemplate = (name: string) =>
      `kubectl delete secret ${name} --ignore-not-found`;
    const createSecretTemplate = (name: string, from: string) =>
      `kubectl create secret generic ${name} ${from}`;

    const services = JSON.parse(
      (
        await execAsync(
          "lerna ls --all --json --ignore '@anass-nadir/my-shop-common'"
        )
      ).stdout
    );
    for (const service of services) {
      const serviceName = service.location.split('/').pop();
      const serviceEnv = `${service.location}/.env.development.local`;
      checkingSpinner.text = blue(
        `Checking env file for ${serviceName} service\n`
      );
      await access(serviceEnv).catch(() => {
        checkingSpinner.fail(red(`👉 ${serviceEnv} doesn't exist. 😃`));
        process.exit(1);
      });
      await execAsync(deleteSecretTemplate(`${serviceName}.env`));
      await execAsync(
        createSecretTemplate(
          `${serviceName}.env`,
          `--from-env-file=${serviceEnv}`
        )
      ).catch(err => {
        checkingSpinner.fail(red(err.message));
        process.exit(1);
      });
      checkingSpinner.info(
        blueBright(`${serviceName}.env created successfully`)
      );
      if (serviceName !== 'client') {
        const serviceDbEnv = `${service.location}/.env.development-db.local`;
        await access(serviceDbEnv).catch(() => {
          checkingSpinner.fail(red(`👉 ${serviceDbEnv} doesn't exist. 😃`));
          process.exit(1);
        });
        await execAsync(deleteSecretTemplate(`${serviceName}-db.env`));
        await execAsync(
          createSecretTemplate(
            `${serviceName}-db.env`,
            `--from-env-file=${serviceDbEnv}`
          )
        ).catch(err => {
          checkingSpinner.fail(red(err.message));
          process.exit(1);
        });
        checkingSpinner.info(
          blueBright(`${serviceName}-db.env created successfully`)
        );
      }
    }
    await execAsync(
      `openssl genrsa -out JWT_SECRET_PRIV 2048 &&
       openssl rsa -in JWT_SECRET_PRIV -outform PEM -pubout -out JWT_SECRET`
    ).catch(err => {
      checkingSpinner.fail(red(err.message));
      process.exit(1);
    });

    await execAsync(deleteSecretTemplate(`jwt-keys`));
    await execAsync(
      createSecretTemplate(
        `jwt-keys`,
        `--from-file=JWT_SECRET_PRIV --from-file=JWT_SECRET`
      )
    ).catch(err => {
      checkingSpinner.fail(red(err.message));
      process.exit(1);
    });
    await execAsync('rm -f JWT_SECRET_PRIV JWT_SECRET');
    checkingSpinner.info(blueBright(`jwt-keys created successfully`));
    checkingSpinner.succeed(green(`Secrets deployed successfully 🚀`));
  }
  if (argv.databases) {
    const checkingSpinner = ora({ prefixText: 'databases' }).start(
      blue(`Starting databases deployments`)
    );
    await execAsync(
      `kubectl apply -f ${process.cwd()}/infra/k8s/dev/databases/`
    );
    checkingSpinner.succeed(green(`Databases deployed successfully 🚀`));
  }
  if (argv.services) {
    const checkingSpinner = ora({ prefixText: 'services' }).start(
      blue(`Starting services deployments`)
    );
    await execAsync(
      `kubectl apply -f ${process.cwd()}/infra/k8s/dev/services/`
    );
    checkingSpinner.succeed(green(`Services deployed successfully 🚀`));
  }
};
