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

import fs from 'fs';
import path from 'path';
import { convert } from '../../src';

beforeAll(() => {
  const outPath = path.resolve(__dirname, './generated-js');
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }
  convert(path.resolve(__dirname, '../css/dirExample/textStyles.css'), { outputType: 'file', outputPath: `${outPath}/file.js` });
});

it('Writes an object to a file', (done) => {
  const { default: exampleFile } = require('./generated-js/file');
  expect(exampleFile).toStrictEqual({
    a: {
      backgroundColor: '#111',
      color: '#000',
    },
    b: {
      backgroundColor: '#222',
      color: '#111',
    },
    '@media (min-width:1000px)': {
      b: {
        color: '#333',
      },
    },
  }
  );

  done();
});

it('Throws error if invalid input', (done) => {
  expect(() => convert(path.resolve(__dirname, '../css/invalid.css'), { outputType: 'file' })).toThrowError('Invalid CSS input: Error: undefined:17:1: missing \'}\'');

  done();
});

it('Throws error if invalid output', (done) => {
  expect(() => convert(path.resolve(__dirname, '../css/dirExample/example1.css'), { outputType: 'file', outputPath: 'nonexistent/path' })).toThrowError('ENOENT: no such file or directory');

  done();
});
