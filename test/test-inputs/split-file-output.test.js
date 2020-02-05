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
  fs.mkdirSync(`${outPath}/split2`);
  convert(path.resolve(__dirname, '../css/dirExample/imgStyles.css'), { outputType: 'splitFile', outputPath: `${outPath}/split.js`, mediaReverse: true });
  convert(path.resolve(__dirname, '../css/dirExample/imgStyles.css'), { outputType: 'splitFile', outputPath: `${outPath}/split2.js`, mediaReverse: true });
});

it('Splits object keys into individual exports across multiple files', (done) => {
  const { default: c } = require('./generated-js/split/c');
  const { default: d } = require('./generated-js/split/d');

  expect(c).toStrictEqual({
    backgroundColor: '#444',
    color: '#555',
  }
  );

  expect(d).toStrictEqual({
    backgroundColor: '#666',
    color: '#777',
  }
  );

  done();
});

it('Splits object and adds files to existing folders', (done) => {
  const { default: c } = require('./generated-js/split2/c');
  const { default: d } = require('./generated-js/split2/d');

  expect(c).toStrictEqual({
    backgroundColor: '#444',
    color: '#555',
  }
  );

  expect(d).toStrictEqual({
    backgroundColor: '#666',
    color: '#777',
  }
  );

  done();
});
