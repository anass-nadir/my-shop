/* eslint-disable security/detect-child-process */
/* eslint-disable import/no-extraneous-dependencies */

import { promisify } from 'util';
import { exec, spawn } from 'child_process';
import { blue, red, blueBright, green } from 'chalk';
import ora from 'ora';

import type { IBuild } from '.';

const execAsync = promisify(exec);

interface IService {
  name: string;
  version: string;
  private: boolean;
  location: string;
}

const asyncSpawn = (command: string, args: ReadonlyArray<string>) =>
  new Promise((res, rej) =>
    spawn(command, args, { stdio: ['inherit', 'inherit', 'pipe'] })
      .stderr?.on('data', (err: any) => {
        rej(err.toString());
      })
      .on('close', (code: number) => {
        if (code) return rej(`process closed with code ${code}`);
        res(true);
      })
  );

export = async (argv: IBuild): Promise<void> => {
  process.on('SIGINT', () => {
    console.error(red('\nprocess exited with SIGINT'));
    process.exit(1);
  });
  const derivedPackages = argv.packages as string[];
  const spinner = ora().start(
    blueBright(
      `👷 About to start building Docker images ${[...derivedPackages]}`
    )
  );
  const services = Array.from(
    JSON.parse(
      (
        await execAsync(
          "lerna ls --all --json --ignore '@anass-nadir/my-shop-common'"
        )
      ).stdout
    )
  );
  for (const pkg of derivedPackages) {
    const service = services.find((srv: any) => srv.name === pkg) as IService;
    if (service) {
      const { location, version } = service;
      const serviceName = location.split('/').pop();
      const imageName = `${argv.scope}/${serviceName}`;
      const dockerPath =
        (serviceName === 'client' &&
          `${process.cwd()}/app/Dockerfile.Client`) ||
        `${process.cwd()}/app/Dockerfile.Server --build-arg Service=${serviceName}`;

      spinner.text = blue(`👷 Building Docker image ${imageName}:${version}\n`);

      await asyncSpawn('docker', [
        'build',
        `${process.cwd()}/app`,
        '-f',
        ...dockerPath.split(' '),
        '-t',
        `${imageName}:${version}`
      ]).catch(err => {
        spinner.fail(red(err));
        process.exit(1);
      });
      spinner.succeed(green(`${imageName}:${version} built successfully`));
      if (version.match(/^(\d+\.)(\d+\.)(\d+)$/)) {
        spinner.start(
          blueBright(`Tagging ${imageName}:${version} as latest\n`)
        );
        await execAsync(
          `docker tag ${imageName}:${version} ${imageName}:latest`
        ).catch(err => {
          spinner.fail(red(err.message));
          process.exit(1);
        });
        spinner
          .info(blue(`${imageName}:${version} tagged as latest successfully\n`))
          .start(blueBright(`🚀 Pushing to docker registry\n`));
        await asyncSpawn('docker', ['push', `${imageName}:${version}`]).catch(
          err => {
            spinner.fail(red(err));
            process.exit(1);
          }
        );
        await asyncSpawn('docker', ['push', `${imageName}:latest`]).catch(
          err => {
            spinner.fail(red(err));
            process.exit(1);
          }
        );
        spinner.succeed(
          green(
            `Successfully pushed image ${imageName}:${version} as latest 🚀`
          )
        );
        continue;
      }
      spinner.start(blueBright(`🚀 Pushing to docker registry\n`));
      await asyncSpawn('docker', ['push', `${imageName}:${version}`]).catch(
        err => {
          spinner.fail(red(err));
          process.exit(1);
        }
      );
      spinner.succeed(
        green(`Successfully pushed image ${imageName}:${version}🚀`)
      );
    } else {
      spinner.fail(red(`${pkg} doesn't exist or can't be dockerized`));
    }
  }
};
