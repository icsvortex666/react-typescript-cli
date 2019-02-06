#!/usr/bin/env node
'use strict';

const create = require('./lib/create');

let componentName;

const program = require('commander')
  .version(require('./package.json').version)
  .arguments('<component-directory>')
  .action(function (name) {
    componentName = name;
  })
  .option('-s, --styles')
  .option('-c, --connect')
  .option('--class')
  .parse(process.argv)

create.createComponent(componentName, program);
