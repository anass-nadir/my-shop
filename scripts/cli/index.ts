#!/usr/bin/env node
/* eslint-disable security/detect-child-process */
/* eslint-disable import/no-extraneous-dependencies */

import yargs, { Arguments, Argv, InferredOptionTypes } from 'yargs';
import { spawn } from 'child_process';
import concurrently from 'concurrently';
import deploy from './deploy';
import buildPublish from './build';

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
    packages: { type: 'array' };
    scope: { type: 'string' };
    publish: { type: 'boolean' };
  }>
>;

const nodeVersion = process.version.match(/v(\d+)\./);

if (nodeVersion && +nodeVersion[1] < 10) {
  console.error('Node v10 or greater is required.');
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
          console.log('Exiting skaffold');
          spawn('skaffold', ['delete'], { stdio: 'inherit' });
        });
        if (argv.watch) {
          concurrently(
            [
              { command: 'yarn watch:common', name: 'common:package' },
              {
                command: `yarn wait-on ${process.cwd()}/app/server/packages/common/build/index.js && skaffold dev`,
                name: 'dev'
              }
            ],
            { killOthers: ['failure'], successCondition: 'first' }
          );
          return;
        }
        spawn('skaffold', ['dev'], { stdio: 'inherit' });
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
      describe: 'Build docker images',
      builder: (yargs: Argv) =>
        yargs
          .options({
            packages: {
              type: 'array',
              alias: 'p',
              demandOption: true
            },
            scope: {
              type: 'string',
              alias: 's',
              default: 'myshp'
            },
            publish: {
              type: 'boolean',
              alias: 'P',
              describe: 'Publish to docker registry'
            }
          })
          .example(
            '$0 build -p pkg-name1 pkg-name2 [-P]',
            'Packages to build [publish]'
          ),
      handler: (argv: IBuild) => buildPublish(argv)
    })
    .help()
    .version(false)
    .wrap(null)
    .alias('help', 'h').argv;
}
