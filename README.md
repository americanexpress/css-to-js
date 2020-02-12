<h1 align="center">
  <img src='https://github.com/americanexpress/css-to-js/raw/master/css-to-js.png' alt="CSS to JS - One Amex" width='50%'/>
</h1>

[![npm](https://img.shields.io/npm/v/@americanexpress/css-to-js)](https://www.npmjs.com/package/@americanexpress/css-to-js)
[![Travis (.org) branch](https://img.shields.io/travis/americanexpress/css-to-js/master)](https://travis-ci.org/americanexpress/css-to-js)

> Tool for transforming CSS into JS

## 👩‍💻 Hiring 👨‍💻

Want to get paid for your contributions to `CSS-to-JS`?
> Send your resume to oneamex.careers@aexp.com

<br />
  
## 📖 Table of Contents  
  
* [Features](#Features)  
* [Usage](#Usage)  
* [API](#API)  
* [Git Hooks](#Git%20Hooks)  
* [Contributing](#Contributing)  
  
<br />  
  
## ✨ Features  
  
* Converts CSS to JS  
* Supports multiple input and output formats (inline code, files, directories)  
* Generates style objects as e6 exports with options to split into separate files  
* Reverse media query distribution  
  
<br />  
  
## 🤹‍ Usage  
  
Install:   
```bash  
npm install @americanexpress/css-to-js --save-dev  
```  
  
CLI:  
```bash  
css-to-js <inputPath> <outputPath> (--mediaReverse) (--splitFile | --shakeFile)  
  
Arguments:  
 inputPath   input path to css file or dir of css files outputPath  output path to js file or dir  Options:  
 --help --version --mediaReverse  reverse mediaQuery style properties  --splitFile  generate multiple files with exports for each selector in css file   
  --shakeFile  generate single file with exports for each selector in css file   
    
  If shakeFile or splitFile is not specified, generate single file with single exported object with selectors in css file as keys  
 See API for more details.
 ```  
  
Node:   
```bash  
import { convert } from 'css-to-js';  
Example Usage:   

//Input CSS string, Outputs JS Object  
convert(`.myClass { color: 'red' }`);   

//Input CSS string, Output file exporting JS Object  
convert(`.myClass { color: 'red' }`, { outputType: 'file', outputPath: 'outPath' });   

//Input CSS file path, Output file exporting JS Object  
convert('absolute-path-to-css-file', { outputType: 'file', outputPath: 'outPath' });  
  
//Input CSS file path, Output file exporting multiple JS Objects  
convert('absolute-path-to-css-file', { outputType: 'shakeFile', outputPath: 'outPath' });  
  
//Input CSS file path, Outputs dir of files exporting single JS Objects (If treeshaking not supported)  
convert('absolute-path-to-css-file', { outputType: 'splitFile', outputPath: 'outPath' });  
  
//Input Dir path of CSS files, Output array of JS Objects  
convert('absolute-path-to-dir');  
  
//Input Dir path of CSS files, Output dir of converted files exporting JS Object  
convert('absolute-path-to-dir'', { outputType: 'file', outputPath: 'outPath' });  
  
```  

## 🎛️ API  
  
#### Input and Output type options

##### *Ensure paths are absolute or relative to the root only*

  
| Convert Function                                                              | Input Type                                     | Output Type(s)                                                                                                                                  |
|-------------------------------------------------------------------------------|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| convert(css);                                                                 | Path to single CSS file or string of CSS code  | JS style object                                                                                                                         |
| convert(css, { outputType: 'file', outputPath: 'example.js' });               | Path to single CSS file or string of CSS code  | Generated JS file 'example.js' with a default export of a JS style object                                                               |
| convert(css, { outputType: 'shakeFile', outputPath: 'shakeExample.js' });     | Path to single CSS file or string of CSS code  | Generated JS file 'shakeExample.js' with multiple named exports of JS style objects                                                     |
| convert(css, { outputType: 'splitFile', outputPath: 'splitExample' });        | Path to single CSS file or string of CSS code  | Generated directory 'splitExample' with multiple files each with a default export of a JS style object                                  |
| convert(dirPath);                                                             | Path to directory of CSS files                 | Array of JS style objects                                                                                                               |
| convert(dirPath, { outputType: 'file', outputPath: 'exampleDir' });           | Path to directory of CSS files                 | Generated directory of JS files; Each file has a default export of a JS style object and is named after the corresponding css file      |
| convert(dirPath, { outputType: 'shakeFile', outputPath: 'shakeExample.js' }); | Path to directory of CSS files                 | Generated directory of JS files; Each file has multiple named exports of JS style objects and is named after the corresponding css file |
| convert(dirPath, { outputType: 'splitFile', outputPath: 'splitExample' });    | Path to directory of CSS files                 | Generated directory of directories; Each file has a default export of a JS style object and is named after the corresponding css file   |
 
 
#### File conversion examples
 
  
**Sample Input: `nav.css`**  
```css  
.class1 {    
  color: 'red';  
}  
.class2 {
  color: 'blue'; 
}
```  
  
---  

**Example 1: File** - Creates a file with a single object export representing tree of full converted css  

```
convert(
   path.resolve(__dirname, './nav.css'), 
   { 
     outputType: 'file', 
     outputPath: path.resolve(__dirname, '../example1.js') 
   }
);
 ```
  
**Output: `Example1.js`**  
```js  
export default {   
  class1: { color: 'red' },   
  class2: { color: 'blue' } 
}  
```  
  
---  
  
**Example 2: ShakeFile** - Create file with multiple exports representing each selector of converted css  
_(Useful for tree-shaking style objects that do not get used)_  

```
convert(
   path.resolve(__dirname, './nav.css'), 
   { 
     outputType: 'shakeFile', 
     outputPath: path.resolve(__dirname, '../example2.js') 
   }
);
 ```
  
**Output: `Example2.js`**  
```js  
export const class1 = { color: 'red' };  
export const class2 = { color: 'blue' };  
```  
  
---  
  
**Example 3: SplitFile** - Create multiple files with exports representing each selector of converted css  
_(Useful for excluding style objects that do not get used if tree-shaking is not implemented)_  

```
convert(
   path.resolve(__dirname, './nav.css'), 
   { 
     outputType: 'splitFile', 
     outputPath: path.resolve(__dirname, '../example3') 
   }
);
 ```
  
**Output: `Example3/`**  
  
**`class1.js`**  
```js  
export default { color: 'red' };  
```  
  
**`class2.js`**  
```js  
export default { color: 'blue' }; 
```  
  
#### Media Reverse  
  
*Note: `mediaReverse` is always true if output type is `shakeFile` or `splitFile`*  
  
Sometimes it's useful to have the styles located in media queries distributed into the selector properties rather than be their own property.  
If the `mediaReverse` flag is set to true, reverse the positioning of media queries to be inside the property.  
  
**`nav.css`**  
```css  
.class1 { color: 'red'; }  
  
@media (min-width:500px) {    
  .class1 { color: 'blue'; } 
}  
@media (min-width:1000px) {    
  .class1 { color: 'green'; } 
}  
```  
If mediaReverse is not set: 
  
```
convert(
   path.resolve(__dirname, './nav.css'), 
   { 
     outputType: 'file', 
     outputPath: path.resolve(__dirname, '../example4.js') 
   }
);
 ```

**`Example4.js`**  
```js  
export default {   
  class1: { color: 'red' },   
  '@media (min-width:500px)': {  
    class2: { color: 'blue' }   
  },  
  '@media (min-width:1000px)': {
    class2: { color: 'green' }   
  }  
}  
````  
  
If mediaReverse is set to **true**:  

```
convert(
   path.resolve(__dirname, './nav.css'), 
   { 
     outputType: 'file', 
     outputPath: path.resolve(__dirname, '../example4.js'),
     mediaReverse: true 
   }
);
 ```
  
**`Example4.js`**  
```js  
export default {   
 class1: { color: 'red' },   
 class2: {   
   '@media (min-width:500px)': {  
     color: 'blue'   
   },  
   '@media (min-width:1000px)': {
     color: 'green'   
   }    
 }  
}  
````  
  
  
<br />  
  
## 🎣 Git Hooks  
  
These commands will be automatically run during normal git operations like committing code.  
  
**`pre-commit`**  
  
This hook runs `npm test` before allowing a commit to be checked in.  
  
**`commit-msg`**  
  
This hook verifies that your commit message matches the One Amex conventions. See the **commit  
message** section in the [CONTRIBUTING.md](./CONTRIBUTING.md).  
  
<br />  
  
## 🏆 Contributing

We welcome Your interest in the American Express Open Source Community on Github.
Any Contributor to any Open Source Project managed by the American Express Open
Source Community must accept and sign an Agreement indicating agreement to the
terms below. Except for the rights granted in this Agreement to American Express
and to recipients of software distributed by American Express, You reserve all
right, title, and interest, if any, in and to Your Contributions. Please [fill
out the Agreement](https://cla-assistant.io/americanexpress/css-to-js).

Please feel free to open pull requests and see [CONTRIBUTING.md](./CONTRIBUTING.md) for commit formatting details.
  
<br />  
  
## 🗝️ License  
  
Any contributions made under this project will be governed by the [Apache License 2.0](./LICENSE.txt).  
  
<br />  
  
## 🗣️ Code of Conduct  
  
This project adheres to the [American Express Community Guidelines](./CODE_OF_CONDUCT.md).  
By participating, you are expected to honor these guidelines.  
