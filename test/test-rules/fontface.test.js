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

it('Valid CSS with @fontface rules', (done) => {
  const result = convert(path.resolve(__dirname, '../css/fontface.css'));
  expect(result).toStrictEqual({
    Font: {
      '@font-face': {
        fontFamily: '"font"',
        fontWeight: 'normal',
        fontDisplay: 'swap',
        src: 'url("https://www.url1.woff") format("woff"), url("https://www.url1.woff2") format("woff2")',
      },
    },
    FontTwoTwo: {
      '@font-face': {
        fontFamily: '"font-two-two"',
        fontWeight: 'normal',
        fontDisplay: 'swap',
        src: 'url("https://www.url2.woff") format("woff"), url("https://url2.woff2") format("woff2")',
      },
    },
    FontThree: {
      '@font-face': {
        fontFamily: '"font-three"',
        fontStyle: 'normal',
        fontWeight: '400',
        fontDisplay: 'swap',
        src: 'url("https://www.url3.woff2") format("woff2")',
      },
    },
    FontFour: {
      '@font-face': {
        fontFamily: '"fontFour"',
        fontWeight: '300',
        fontDisplay: 'swap',
        src: 'url("https://www.url3.woff") format("woff")',
      },
    },
    FontFour_2: {
      '@font-face': {
        fontFamily: '"fontFour"',
        fontWeight: '400',
        fontDisplay: 'swap',
        src: 'url("https://www.url4.woff") format("woff")',
      },
    },
    FontFour_3: {
      '@font-face': {
        fontFamily: '"fontFour"',
        fontWeight: '500',
        fontDisplay: 'swap',
        src: 'url("https://www.url5.woff") format("woff")',
      },
    },
    Font_2_0: {
      '@font-face': {
        fontFamily: '"font-2.0"',
        fontWeight: 'normal',
        fontDisplay: 'block',
        src: 'url("https://www.url6.woff?") format("woff"), url("https://www.url6.woff2?") format("woff2")',
      },
    },
  }
  );

  done();
});
