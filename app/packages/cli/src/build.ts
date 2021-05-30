import { red, blueBright, green, yellow } from 'chalk';
import ora from 'ora';
import execa, { command, Options } from 'execa';
import { genPrefix, IBuild } from '.';

interface IService {
  name: string;
  version: string;
  private: boolean;
  location: string;
}

const asyncSpawn = async (
  command: string,
  args: ReadonlyArray<string>,
  prefix: string,
  options?: Options
): Promise<unknown> =>
  new Promise((res, rej) => {
    const exec = execa(command, args, options);
    exec.stderr?.once('data', err => {
      rej(`${prefix} ${err.toString()}`);
    });
    exec.stdout?.on('data', (data: Buffer) => {
      console.log(`${prefix} ${data.toString()}`);
    });
    exec.once('close', () => {
      res(true);
    });
  });

export = async (argv: IBuild): Promise<void> => {
  process.on('SIGINT', () => {
    console.error(red('\nprocess exited with SIGINT'));
    process.exit(1);
  });
  const derivedPackages =
    (argv.services as string[]) ||
    ((
      await command("git tag --contain | grep '@my-shop/.*'", {
        shell: true
      }).catch(() => {
        console.log(yellow("Cannot find new services' tags in this branch 😅"));
        process.exit(0);
      })
    ).stdout.split('\n') as string[]);
  const Jobs: Array<null | (() => Promise<string>)> = [];
  const { stdout } = await command(
    "lerna ls --all --json --ignore '@anass-nadir/*'"
  ).catch(({ message, exitCode }) => {
    console.error(message);
    process.exit(exitCode);
  });
  const services = Array.from(JSON.parse(stdout));

  for (const pkg of derivedPackages) {
    const service = services.find((srv: any) => {
      const pkgTest = pkg.match(/^(@my-shop\/.*)@(\d+\.\d+\.\d+(.*))$/);
      return (pkgTest && pkgTest[1] === srv.name) || srv.name === pkg;
    }) as IService;
    service &&
      Jobs.push(async () => {
        const { location, version, name } = service;
        const prefix = genPrefix(name);
        const serviceName = location.split('/').pop();
        const imageName = `${argv.scope}/${serviceName}`;
        const dockerPath =
          (serviceName === 'client' &&
            `${process.cwd()}/app/Dockerfile.Client`) ||
          `${process.cwd()}/app/Dockerfile.Server --build-arg Service=${serviceName}`;
        console.info(
          prefix +
            blueBright(` Building docker image ${imageName}:${version} 👷\n`)
        );
        //TODO:Buildx outputs in stderr
        await asyncSpawn(
          'docker',
          [
            // 'buildx',
            'build',
            `${process.cwd()}/app`,
            '-f',
            ...dockerPath.split(' '),
            '-t',
            `${imageName}:${version}`
          ],
          prefix
          // { stderr: 'ignore' }
        );
        if (!argv.publish)
          return `${prefix} Successfully built image ${imageName}:${version}`;
        if (version.match(/^(\d+\.)(\d+\.)(\d+)$/)) {
          console.info(
            prefix + blueBright(` Tagging ${imageName}:${version} as latest\n`)
          );
          await command(
            `docker tag ${imageName}:${version} ${imageName}:latest`
          ).catch(err => {
            throw `${prefix} ${err.message}`;
          });
          console.info(prefix + blueBright(` Pushing to docker registry 🚀\n`));
          await asyncSpawn(
            'docker',
            ['push', `${imageName}:${version}`],
            prefix
          );
          await asyncSpawn('docker', ['push', `${imageName}:latest`], prefix);
          return `${prefix} Successfully pushed image ${imageName}:${version} as latest 🚀`;
        }
        console.info(prefix + blueBright(` Pushing to docker registry 🚀\n`));
        await asyncSpawn('docker', ['push', `${imageName}:${version}`], prefix);
        return `${prefix} Successfully pushed image ${imageName}:${version} 🚀`;
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
  spinner.warn(yellow('Nothing to build please try this command with --help'));
};
