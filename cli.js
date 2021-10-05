#!/usr/bin/env node
const { Command } = require('commander');
const api = require('./index.js');
const pkg = require('./package.json')
const program = new Command();

if (process.argv.length === 2) {
  void api.showAll()
  return
}

program.version(pkg.version);

program
  .command('add <taskName...>')
  .description('add a task')
  .action((taskName) => {
    const words = taskName.join(' ')
    api.add(words).then(() => { console.log('添加成功') }, () => { console.log('添加失败') });
  })

program
  .command('cleanup')
  .description('clear all task')
  .action(() => {
    api.cleanup().then(() => { console.log('清除成功') }, () => { console.log('清除失败') });
  });

program.parse(process.argv);
