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
  fs.mkdirSync(`${outPath}/dirShakes`);
  convert(path.resolve(__dirname, '../css/dirExample'), { outputType: 'shakeFile', outputPath: `${outPath}/dirShakes`, mediaReverse: true });
});

it('Converts a shake Dir', (done) => {
  const { a, b } = require('./generated-js/dirShakes/textStyles');
  const { c, d } = require('./generated-js/dirShakes/imgStyles');
  const { e, f } = require('./generated-js/dirShakes/layoutStyles');

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
