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

import { convert } from '../../src';

const str = `
  @media (min-width:768px) {
    .a {
      background-color: #111;
      color: #000;
    }
  }
  
  .b {
    background: #222;
    color: #111;
    font-size: 15px;
  }
  
  .c {
    color: #000;
  }
  
  .a {
    background-color: #000;
  }
  
  .b {
    background-color: #222;
  }
  
  #a {
    background-color: #333;
  }
  `;

it('Convert string input', (done) => {
  const result = convert(str);
  expect(result).toStrictEqual({
    '@media (min-width:768px)': {
      a: {
        backgroundColor: '#111',
        color: '#000',
      },
    },
    a: {
      backgroundColor: '#000',
    },
    b: {
      background: '#222',
      color: '#111',
      fontSize: '15px',
      backgroundColor: '#222',
    },
    c: {
      color: '#000',
    },
    $a: {
      backgroundColor: '#333',
    },
  }
  );

  done();
});

it('Convert string input with reverse media', (done) => {
  const result = convert(str, { mediaReverse: true });
  expect(result).toStrictEqual({

    a: {
      '@media (min-width:768px)': {
        backgroundColor: '#111',
        color: '#000',
      },
      backgroundColor: '#000',
    },
    b: {
      background: '#222',
      color: '#111',
      fontSize: '15px',
      backgroundColor: '#222',
    },
    c: {
      color: '#000',
    },
    $a: {
      backgroundColor: '#333',
    },
  }
  );

  done();
});

it('Throws error if invalid input', (done) => {
  expect(() => convert('.myClass {', { outputType: 'file' })).toThrowError('Invalid CSS input: Error: undefined:1:11: missing \'}\'');

  done();
});
