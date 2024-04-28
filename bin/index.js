#!/usr/bin/env node
import version from "../modules/version.js";
import helpFootFont from "../modules/helpFootFont.js";
import data from '../modules/RegistryData.js'
import { Command } from 'commander';
import chalk from 'chalk';
import execPromise from '../utils/exec.js'
import { input, select, checkbox } from '@inquirer/prompts';
import { addRegistry, delRegistry } from '../utils/handleRegistry.js'

const program = new Command();
program.name('nrm')
  .usage('<command> [options]')
  .description(chalk.green(`www.ixyz.org`))
  .version(`v${version}`, '-version, --version', '显示版本号')
  .helpOption('-h, --help', '显示此帮助信息')
  .addHelpText('after', "\n" + helpFootFont)
  .addHelpCommand(false)

program.command('use')
  .description('切换镜像源')
  .action(async (name, options) => {
    const answer = await select({
      message: '选择镜像源',
      theme: {
        helpMode: 'always'
      },
      choices: data
    })
    await execPromise(`npm config set registry ${answer}`)
    console.log(chalk.green.bold(`切换成功`));
  });

program.command('add')
  .description('添加镜像源')
  .action(async (name, options) => {
    const registryName = await input({ message: '输入镜像源名称' });
    const registryValue = await input({ message: '输入镜像源地址' });
    if (!registryName || !registryValue) {
      console.log(chalk.red.bold('输入不能为空'));
      return
    }
    if (!registryValue.startsWith('http://') && !registryValue.startsWith('https://')) {
      console.log(chalk.red.bold('镜像源地址必须以http://开头或者https://'));
      return
    }
    addRegistry(registryName.trim(), registryValue.trim())
    console.log(chalk.green.bold(`添加成功`));
  });

program.command('del')
  .description('删除镜像源')
  .action(async (name, options) => {
    const answer = await checkbox({
      message: '选择即将要删除的镜像',
      choices: data,
      theme: {
        helpMode: 'always'
      }
    });
    if (answer.length === 0) {
      console.log(chalk.red.bold('未选择任何源进行删除'));
    } else {
      delRegistry(answer)
      console.log(chalk.green.bold(`删除成功`));
    }
  });

program.parse(process.argv);