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

it('Valid CSS with @media rules', (done) => {
  const result = convert(path.resolve(__dirname, '../css/mediaQueries.css'));
  expect(result).toStrictEqual({
    dog: {
      backgroundColor: '#111',
      color: '#000',
    },
    cat: {
      backgroundColor: '#222',
      color: '#111',
    },
    rat: {
      color: 'blue',
    },
    '@media screen and (min-width:1020px)': {
      body: {
        color: 'greenyellow',
      },
      body__bird: {
        width: '1020px !important',
        color: 'blue',
      },
      rat: {
        color: 'royalblue',
      },
      p: {
        color: 'pink',
      },
    },
    '@media (min-width:768px)': {
      body__bird: {
        width: '748px !important',
      },
    },
    '@media print': {
      body__bird: {
        width: '748px !important',
      },
    },
  });

  done();
});

it('Valid CSS with @media rules reversed', (done) => {
  const result = convert(path.resolve(__dirname, '../css/mediaQueries.css'), { mediaReverse: true });
  expect(result).toStrictEqual({
    dog: {
      backgroundColor: '#111',
      color: '#000',
    },
    cat: {
      backgroundColor: '#222',
      color: '#111',
    },
    rat: {
      color: 'blue',
      '@media screen and (min-width:1020px)': {
        color: 'royalblue',
      },
    },
    body: {
      '@media screen and (min-width:1020px)': {
        color: 'greenyellow',
      },
    },
    body__bird: {
      '@media screen and (min-width:1020px)': {
        width: '1020px !important',
        color: 'blue',
      },
      '@media (min-width:768px)': {
        width: '748px !important',
      },
      '@media print': {
        width: '748px !important',
      },
    },

    p: {
      '@media screen and (min-width:1020px)': {
        color: 'pink',
      },
    },
  });

  done();
});

it('Valid CSS with a repeated @media query', (done) => {
  const result = convert(path.resolve(__dirname, '../css/mediaQueryDuplicated.css'));
  expect(result).toStrictEqual({
    dog: {
      backgroundColor: '#111',
      color: '#000',
    },
    cat: {
      backgroundColor: '#222',
      color: '#111',
    },
    '@media (min-width:768px)': {
      nav: {
        width: '400px !important',
      },
      section: {
        width: '768px !important',
      },
      footer: {
        width: '768px !important',
      },
    },
  });

  done();
});

it('Valid CSS with a repeated @media query reversed', (done) => {
  const result = convert(path.resolve(__dirname, '../css/mediaQueryDuplicated.css'), { mediaReverse: true });
  expect(result).toStrictEqual({
    dog: {
      backgroundColor: '#111',
      color: '#000',
    },
    cat: {
      backgroundColor: '#222',
      color: '#111',
    },
    nav: {
      '@media (min-width:768px)': {
        width: '400px !important',
      },
    },
    section: {
      '@media (min-width:768px)': {
        width: '768px !important',
      },
    },
    footer: {
      '@media (min-width:768px)': {
        width: '768px !important',
      },
    },
  });

  done();
});
