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

import camelize from '../utils/camelize';
import sanitize from '../utils/sanitize';

const keyframes = (rule) => {
  const keyFrameObj = {};
  rule.keyframes.forEach((keyframe) => {
    keyframe.declarations.forEach((decl) => {
      keyFrameObj[keyframe.values[0]] = {
        ...keyFrameObj[keyframe.values[0]],
        [decl.property]: decl.value,
      };
    });
  });
  let name = camelize(`keyframes-${rule.name}`);
  const obj = {};
  obj[`@keyframes ${rule.name}`] = keyFrameObj;

  name = sanitize(name);

  return [name, obj];
};

export default keyframes;
