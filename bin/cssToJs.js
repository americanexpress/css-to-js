#! /usr/bin/env node
/* eslint-disable prefer-destructuring, no-console */

/*
 * Copyright 2020 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

const { version } = require('../package.json');

const help = `
Usage:
  css-to-js <inputPath> <outputPath> (--mediaReverse) (--splitFile | --shakeFile)

Arguments:
  inputPath   input path to css file or dir of css files
  outputPath  output path to js file or dir

Options:
  --help
  --version
  --mediaReverse  reverse mediaQuery style properties (see Readme for more details)
  --splitFile  generate multiple files with exports for each selector in css file (see Readme for more details)
  --shakeFile  generate single file with exports for each selector in css file (see Readme for more details)

  If shakeFile or splitFile is not specified, generate single file with single exported object with selectors in css file  as keys
`;

const CssToJs = require('../lib/cjs');

const commands = process.argv;
const config = {};
const split = commands.includes('--splitFile');
const shakeable = commands.includes('--shakeFile');
const inputPath = commands[2];
config.outputPath = commands[3];
config.mediaReverse = commands.includes('--mediaReverse');

if (commands.includes('--help')) {
  console.log(help);
} else if (commands.includes('--version')) {
  console.log(version);
} else {
  if (split) {
    config.outputType = 'splitFile';
  } else if (shakeable) {
    config.outputType = 'shakeFile';
  } else {
    config.outputType = 'file';
  }

  CssToJs.convert(inputPath, config);
}
