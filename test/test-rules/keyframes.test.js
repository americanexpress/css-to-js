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

it('Valid CSS with @keyframes rules', (done) => {
  const result = convert(path.resolve(__dirname, '../css/keyframes.css'));
  expect(result).toStrictEqual({
    keyframesFillLeft: {
      '@keyframes fill-left': {
        '0%': {
          left: '-35%',
          right: '100%',
        },
        '100%': {
          left: '100%',
          right: '-90%',
        },
        '60%': {
          left: '100%',
          right: '-90%',
        },
      },
    },
    keyframesSlidedown: {
      '@keyframes slidedown': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-50px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    keyframesSlideup: {
      '@keyframes slideup': {
        '0%': {
          opacity: '0',
          transform: 'translateY(50px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    keyframesSpin: {
      '@keyframes spin': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
    },
  });

  done();
});
