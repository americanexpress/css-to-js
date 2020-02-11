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
import indentObject from '../utils/indentLine';

const writeToFile = (outPath, input, outputType) => {
  let fileOutPath = outPath;

  // Case: "SplitFile": Export input object key, values as exports to separate file
  if (outputType === 'splitFile') {
    // Create dir for generated split files
    if (path.extname(fileOutPath)) {
      fileOutPath = fileOutPath.slice(0, -3);
    } else {
      fileOutPath = path.join(fileOutPath, input.filename);
    }

    if (!fs.existsSync(fileOutPath)) {
      fs.mkdirSync(fileOutPath);
    }

    Object.entries(input.contents).forEach((key) => {
      const body = indentObject(key[1], 2);
      fs.writeFileSync(path.join(fileOutPath, `${key[0]}.js`), 'export default ');
      fs.appendFileSync(path.join(fileOutPath, `${key[0]}.js`), body);
    });
  } else {
    // Create file for generated shake or simple file

    if (!path.extname(fileOutPath)) {
      fileOutPath = path.join(fileOutPath, `${input.filename}.js`);
    }

    if (outputType === 'shakeFile') {
      // Case: "ShakeFile": Export input object key, values as exports to file
      fs.writeFileSync(fileOutPath, '');
      Object.entries(input.contents).forEach((key) => {
        fs.appendFileSync(fileOutPath, `export const ${key[0]} =  ${JSON.stringify(key[1])};\n`);
      });
    } else {
      // Case: "File": Export input object to file
      const body = indentObject(input.contents, 2);
      fs.writeFileSync(fileOutPath, 'export default ');
      fs.appendFileSync(fileOutPath, body);
    }
  }
};

export default writeToFile;
