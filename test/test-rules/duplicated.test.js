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

import path from 'path';
import { convert } from '../../src';

it('Valid CSS with duplicated rules', (done) => {
  const result = convert(path.resolve(__dirname, '../css/duplicated.css'));
  expect(result).toStrictEqual({
    dog: {
      backgroundColor: '#000',
      color: '#000',
    },
    cat: {
      background: '#222',
      color: '#111',
      fontSize: '15px',
      backgroundColor: '#222',
    },
    cat_$dog: {
      background: '#444',
    },
    rat: {
      color: '#000',
    },
    $dog: {
      backgroundColor: '#333',
    },
  }
  );

  done();
});
