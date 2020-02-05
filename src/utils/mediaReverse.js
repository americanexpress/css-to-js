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

const reverseMediaQueries = (inputData) => {
  const exportObject = {};
  const moveMediaInsideClass = (object, media = false) => {
    Object.entries(object).forEach(([key, value]) => {
      if (key.includes('@media')) {
        moveMediaInsideClass(object[key], key);
      } else if (media) {
        const tempObj = {};
        tempObj[media] = value;
        if (exportObject[key]) {
          exportObject[key] = { ...exportObject[key], ...tempObj };
        } else {
          exportObject[key] = tempObj;
        }
      } else if (exportObject[key]) {
        exportObject[key] = { ...exportObject[key], ...value };
      } else {
        exportObject[key] = value;
      }
    });
  };

  moveMediaInsideClass(inputData);
  return exportObject;
};

export default reverseMediaQueries;
