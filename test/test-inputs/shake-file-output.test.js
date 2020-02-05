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
  convert(path.resolve(__dirname, '../css/dirExample/textStyles.css'), { outputType: 'shakeFile', outputPath: `${outPath}/shake.js`, mediaReverse: true });
});

it('Splits object keys into individual exports in a file', (done) => {
  const { a, b } = require('./generated-js/shake');
  expect(a).toStrictEqual({
    backgroundColor: '#111',
    color: '#000',
  });

  expect(b).toStrictEqual({
    backgroundColor: '#222',
    color: '#111',
    '@media (min-width:1000px)': {
      color: '#333',
    },
  });

  done();
});
