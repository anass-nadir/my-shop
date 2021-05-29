#!/usr/bin/env node

import yargs, { Arguments, Argv, InferredOptionTypes } from 'yargs';
import concurrently from 'concurrently';
import deploy from './deploy';
import buildPublish from './build';
import { command } from 'execa';
import { randomBytes } from 'crypto';
import { hex } from 'chalk';

export type IDev = Arguments<
  InferredOptionTypes<{
    watch: { type: 'boolean' };
  }>
>;

export type IDeploy = Arguments<
  InferredOptionTypes<{
    secrets: { type: 'boolean' };
    databases: { type: 'boolean' };
    services: { type: 'boolean' };
  }>
>;

export type IBuild = Arguments<
  InferredOptionTypes<{
    services: { type: 'array' };
    scope: { type: 'string' };
    publish: { type: 'boolean' };
  }>
>;
export const genPrefix = (prefix: string): string =>
  `[${hex(randomBytes(3).toString('hex'))(prefix)}]:`;
const nodeVersion = process.version.match(/v(\d+)\./);

if (nodeVersion && +nodeVersion[1] < 12) {
  console.error('Node v12 or greater is required.');
} else {
  yargs
    .command({
      command: 'start [watch]',
      aliases: ['dev', 'run'],
      describe: 'Start development environment',
      builder: (yargs: Argv) =>
        yargs.option('watch', {
          type: 'boolean',
          alias: 'w',
          describe: 'Run dev watching changes on common package'
        }),
      handler: (argv: IDev) => {
        process.on('SIGINT', () => {
          console.log('Exiting skaffold please wait!!');
          command('skaffold delete', { stdio: 'inherit' });
        });
        if (argv.watch)
          return concurrently(
            [
              {
                command: 'yarn watch:common',
                name: 'common:package:',
                prefixColor: 'blue'
              },
              {
                command: `yarn wait-on ${process.cwd()}/app/server/packages/common/build/index.js && skaffold dev`,
                name: 'dev:',
                prefixColor: 'green'
              }
            ],
            { killOthers: ['failure'], successCondition: 'first' }
          );
        command('skaffold dev', { stdio: 'inherit' });
      }
    })
    .command({
      command: 'deploy [manifests]',
      describe: 'Pre Dev Deployments',
      builder: (yargs: Argv) =>
        yargs.options({
          secrets: {
            type: 'boolean',
            alias: 'S',
            describe: 'Deploy secrets'
          },
          databases: {
            type: 'boolean',
            alias: 'd',
            describe: 'Deploy databases'
          },
          services: {
            type: 'boolean',
            alias: 's',
            describe: 'Deploy services'
          }
        }),
      handler: (argv: IDeploy) => deploy(argv)
    })
    .command({
      command: 'build [publish]',
      describe: 'Build [publish] docker images',
      builder: (yargs: Argv) =>
        yargs
          .options({
            services: {
              type: 'array',
              alias: 's',
              defaultDescription:
                "Latest pushed services' tags in current branch",
              description:
                'Array of services. supported formats: [pkg-name|full-tag]'
            },
            scope: {
              type: 'string',
              alias: 'S',
              default: 'myshp'
            },
            publish: {
              type: 'boolean',
              alias: 'p',
              describe: 'Publish to docker registry'
            }
          })
          .example(
            '$0 build -s @my-shop/client @my-shop/client@1.2.3 [-p]',
            'build services [publish]'
          )
          .example('$0 build [-p]', "build latest services' tags [publish]"),
      handler: (argv: IBuild) => buildPublish(argv)
    })
    .help()
    .version(false)
    .wrap(null)
    .alias('help', 'h').argv;
}
