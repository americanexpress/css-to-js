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
  fs.mkdirSync(`${outPath}/dirFiles`);
  convert(path.resolve(__dirname, '../css/dirExample'), { outputType: 'file', outputPath: `${outPath}/dirFiles` });
});

it('Converts a Dir', (done) => {
  const { default: example1 } = require('./generated-js/dirFiles/textStyles');
  const { default: example2 } = require('./generated-js/dirFiles/imgStyles');
  const { default: example3 } = require('./generated-js/dirFiles/layoutStyles');

  expect(example1).toStrictEqual({
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

  expect(example2).toStrictEqual({
    c: {
      backgroundColor: '#444',
      color: '#555',
    },
    d: {
      backgroundColor: '#666',
      color: '#777',
    },
  }
  );

  expect(example3).toStrictEqual({
    e: {
      backgroundColor: '#888',
      color: '#999',
    },
    f: {
      backgroundColor: '#111',
      color: '#222',
    },
  }
  );

  done();
});

it('Returns array if output is not a file', (done) => {
  const arr = convert(path.resolve(__dirname, '../css/dirExample'));
  expect(arr).toEqual(
    [{
      c: {
        backgroundColor: '#444',
        color: '#555',
      },
      d: {
        backgroundColor: '#666',
        color: '#777',
      },
    },
    {
      e: {
        backgroundColor: '#888',
        color: '#999',
      },
      f: {
        backgroundColor: '#111',
        color: '#222',
      },
    }, {
      '@media (min-width:1000px)': {
        b: {
          color: '#333',
        },
      },
      a: {
        backgroundColor: '#111',
        color: '#000',
      },
      b: {
        backgroundColor: '#222',
        color: '#111',
      },
    }]
  );

  done();
});

it('Throws error if folder with invalid files', (done) => {
  expect(() => convert(path.resolve(__dirname, '../css/dirExample/invalidDir'), { outputType: 'file' })).toThrowError('Invalid CSS input: Error: undefined:19:1: missing \'}\'');

  done();
});

it('Throws error if invalid folder', (done) => {
  expect(() => convert(path.resolve(__dirname, '../css/dirExample/fakeDir'), { outputType: 'file' })).toThrowError('ENOENT: no such file or directory');

  done();
});
