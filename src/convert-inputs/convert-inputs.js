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
import fs from 'fs';
import convertToJS from '../convert-rules/convertToJS';
import reverseMediaQueries from '../utils/mediaReverse';

export const convertStringToJson = (input, mediaReverse) => {
  let contents = convertToJS(input);
  if (mediaReverse) {
    contents = reverseMediaQueries(contents);
  }
  return { contents };
};

export const convertFileToJson = (inputFile, mediaReverse) => {
  const css = fs.readFileSync(inputFile, 'utf8');

  let contents = convertToJS(css);
  if (mediaReverse) {
    contents = reverseMediaQueries(contents);
  }
  const filename = path.basename(inputFile, '.css');
  return { contents, filename };
};

export const convertDirToJson = (inputLocation, mediaReverse) => {
  const files = fs.readdirSync(inputLocation);
  return files.filter((file) => {
    if (fs.statSync(path.join(inputLocation, file)).isDirectory()) {
      console.warn(`Nested directories not supported, skipping ${file}`);
      return false;
    }
    return true;
  }).map((file) => convertFileToJson(path.join(inputLocation, file), mediaReverse));
};
