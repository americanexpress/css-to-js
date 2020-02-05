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

it('Valid CSS with combined rules', (done) => {
  const result = convert(path.resolve(__dirname, '../css/combinations.css'));
  expect(result).toStrictEqual({
    snake: {
      background: '#111',
      color: '#000',
    },
    lizard: {
      fontSize: '16px',
      color: 'red',
    },
    $lizard__cricket: {
      backgroundColor: 'orange',
    },
    rabbit: {
      color: '#000',
    },
    carrot: {
      color: '#000',
    },
    $lizard: {
      background: '#222',
      color: '#111',
    },
    bird_seed: {
      color: 'red',
    },
    dog__bone: {
      color: 'blue',
    },
    dog__milkbone: {
      color: 'blue',
    },
    cat_blue: {
      color: 'yellow',
    },
    cat____blue: {
      color: 'purple',
    },
    horse___p: {
      color: 'lavender',
    },
    mouse____cheese: {
      color: 'red',
    },
  }
  );

  done();
});
