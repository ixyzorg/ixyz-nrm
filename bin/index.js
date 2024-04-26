#!/usr/bin/env node
import version from "../modules/version.js";
import helpFootFont from "../modules/helpFootFont.js";
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();
program.name('ixyz-tool')
  .usage('<command> [options]')
  .description(chalk.green(`www.ixyz.org`))
  .version(`v${version}`, '-version, --version', '显示版本号')
  .helpOption('-h, --help', '显示此帮助信息')
  .addHelpText('after', "\n" + helpFootFont)
  .addHelpCommand(false)


program.parse(process.argv);