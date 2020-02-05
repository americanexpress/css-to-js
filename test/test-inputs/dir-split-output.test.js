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
  fs.mkdirSync(`${outPath}/dirSplits`);
  convert(path.resolve(__dirname, '../css/dirExample'), { outputType: 'splitFile', outputPath: `${outPath}/dirSplits`, mediaReverse: true });
});

it('Converts a split Dir', (done) => {
  const { default: a } = require('./generated-js/dirSplits/textStyles/a');
  const { default: b } = require('./generated-js/dirSplits/textStyles/b');
  const { default: c } = require('./generated-js/dirSplits/imgStyles/c');
  const { default: d } = require('./generated-js/dirSplits/imgStyles/d');
  const { default: e } = require('./generated-js/dirSplits/layoutStyles/e');
  const { default: f } = require('./generated-js/dirSplits/layoutStyles/f');

  expect(a).toStrictEqual({ backgroundColor: '#111', color: '#000' });
  expect(b).toStrictEqual({
    backgroundColor: '#222',
    color: '#111',
    '@media (min-width:1000px)': {
      color: '#333',
    },
  });

  expect(c).toStrictEqual({
    backgroundColor: '#444',
    color: '#555',
  });

  expect(d).toStrictEqual({
    backgroundColor: '#666',
    color: '#777',
  });

  expect(e).toStrictEqual({
    backgroundColor: '#888',
    color: '#999',
  }
  );

  expect(f).toStrictEqual({
    backgroundColor: '#111',
    color: '#222',
  }
  );

  done();
});
