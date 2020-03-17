/* eslint-disable no-console */

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

describe('cssToJs', () => {
  const originalProcessArgv = process.argv;

  afterAll(() => {
    process.argv = originalProcessArgv;
  });

  describe('CLI', () => {
    let cssToJs;
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
      cssToJs = require('../../lib/cjs');
      jest.mock('../../lib/cjs/index', () => ({
        convert: jest.fn(),
      }));
    });

    afterEach(() => {
      process.argv = originalProcessArgv;
    });

    it('converts to file', () => {
      process.argv = [...process.argv, 'input', 'output'];
      require('../../bin/cssToJs');
      expect(cssToJs.convert).toBeCalledWith('input', {
        mediaReverse: false,
        outputPath: 'output',
        outputType: 'file',
      });
    });

    it('converts to file with media reverse', () => {
      process.argv = [...process.argv, 'input', 'output', '--mediaReverse'];
      require('../../bin/cssToJs');
      expect(cssToJs.convert).toBeCalledWith('input', {
        mediaReverse: true,
        outputPath: 'output',
        outputType: 'file',
      });
    });

    it('converts to split files', () => {
      process.argv = [...process.argv, 'input', 'output', '--mediaReverse', '--splitFile'];
      require('../../bin/cssToJs');
      expect(cssToJs.convert).toBeCalledWith('input', {
        mediaReverse: true,
        outputPath: 'output',
        outputType: 'splitFile',
      });
    });

    it('converts to shake file', () => {
      process.argv = [...process.argv, 'input', 'output', '--mediaReverse', '--shakeFile'];
      require('../../bin/cssToJs');
      expect(cssToJs.convert).toBeCalledWith('input', {
        mediaReverse: true,
        outputPath: 'output',
        outputType: 'shakeFile',
      });
    });

    it('returns version on --version', () => {
      process.argv = [...process.argv, '--version'];
      global.console = { log: jest.fn() };
      require('../../bin/cssToJs');

      expect(console.log).toHaveBeenCalledWith('1.0.0');
    });

    it('returns help message on --help', () => {
      process.argv = [...process.argv, '--help'];
      global.console = { log: jest.fn() };
      require('../../bin/cssToJs');

      expect(console.log).toHaveBeenCalledWith(
        `
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
`
      );
    });
  });
});
