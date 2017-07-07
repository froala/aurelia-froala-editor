# aurelia-froala-editor

>This package provides a custom element for the [Froala editor](https://www.froala.com/wysiwyg-editor) in [Aurelia](http://aurelia.io/).

## Table of contents

1. [Installation instructions](#installation-instructions)
2. [Integration](#integration)
   1. [With Aurelia CLI](#with-angular-cli)
   2. [With Webpack](#with-webpack)
   3. [With JSPM](#with-jspm)
3. [Usage](#usage)
4. [License](#license)

## Installation instructions

Install `aurelia-froala-editor` from `npm`

```bash
npm install angular-froala-editor --save
```

## Integration

### With Aurelia CLI

#### Installing aurelia-cli

*Note*: you can skip this part if you already have application generated.

```bash
npm install aurelia-cli -g
au new my-app
cd my-app
```

#### Add aurelia-froala-editor

- Install the aurelia plugin

```bash
npm install aurelia-froala-editor --save
```

- In your `src/main.js` or `src/main.ts` file add:


```javascript
// Editor files.
import "froala-editor/js/froala_editor.pkgd.min";

...

// Use the aurelia-froala-editor plugin.
aurelia.use.plugin('aurelia-froala-editor');
```

- In your `src/app.html` include CSS files and Froala Editor component:

```html
<require from="font-awesome.css"></require>
<require from="froala-editor/css/froala_editor.pkgd.min.css"></require>
<require from="froala-editor/css/froala_style.min.css"></require>

<froala-editor></froala-editor>
```

- In `aurelia_project/aurelia.json` file set the builder loader plugins stub to `false`

```javascript
// Editor files.
import "froala-editor/js/froala_editor.pkgd.min";

...

// Use the aurelia-froala-editor plugin.
aurelia.use.plugin('aurelia-froala-editor');
```

- ​

```json
"loader": {
  "type": "require",
  "configTarget": "vendor-bundle.js",
  "includeBundleMetadataInConfig": "auto",
  "plugins": [
    {
      "name": "text",
      "extensions": [
        ".html",
        ".css"
      ],
      "stub": false
    }
  ]
}
```

- In `aurelia_project/aurelia.json` add to `vendor_bundle`

```javascript
{
  "name": "font-awesome",
  "path": "../node_modules/font-awesome/css",
  "main": "font-awesome.css"
},
"jquery",
{
  "name": "froala-editor",
  "path": "../node_modules/froala-editor",
  "main": "js/froala_editor.min",
  "resources": [
    "./js/**/*.{js}",
    "./css/**/*.{css}"
  ]
},
{
  "name": "aurelia-froala-editor",
  "path": "../node_modules/aurelia-froala-editor/dist/amd",
  "main": "index",
  "resources": [
    "froala-editor.js",
    "froala-editor.html"
  ],
  "deps": [
    "jquery",
    "froala-editor",
    "font-awesome"
  ]
}
```

- Create a task to copy Font Awesome fonts:

```javascript
au generate task copy-assets
```

- Open newly created `aurelia_project/tasks/copy-assets.js` file and make it look like this:

```javascript
import gulp from 'gulp';
import project from '../aurelia.json';

export default function copyAssets(done) {
  let assets = project.paths.assets;

  assets.forEach(item => {
    gulp.src(item.src)
        .pipe(gulp.dest(item.dest));
    });

  done();
}
```

- Open `aurelia-project/tasks/build.js` file and modify it to look like this:

```javascript
import copyAssets from './copy-assets';

let build = gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    ... 
    copyAssets // Add this.
  ),
  writeBundles
);
```

- Add Font Awesome paths to `aurelia_project/aurelia.json` file:

```javascript
{
  "paths": {
    "root": "src",
    "resources": "resources",
    "elements": "resources/elements",
    "attributes": "resources/attributes",
    "valueConverters": "resources/value-converters",
    "bindingBehaviors": "resources/binding-behaviors",
    "assets": [
      {
        "src": "./node_modules/font-awesome/fonts/**/*.*",
        "dest": "./fonts"
      }
    ]
  }
}
```

#### Run aurelia-cli

```bash
au run --watch
```



### With Webpack

To configure your project with Webpack, follow the resources from Aurelia Docs: http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/setup-webpack/2 .

```bash
git clone git@github.com:aurelia/skeleton-navigation.git
cd skeleton-navigation/skeleton-esnext-webpack
npm install
```

#### Add aurelia-froala-editor

- Install the aurelia plugin

```bash
npm install aurelia-froala-editor --save
```

- In your `src/main.js` or `src/main.ts` file add:

```javascript
import { PLATFORM } from "aurelia-pal";

// Editor files.
import "froala-editor/js/froala_editor.pkgd.min";

...

// Use the aurelia-froala-editor plugin.
aurelia.use.plugin(PLATFORM.moduleName('aurelia-froala-editor'));
```

- In your `src/app.html` include CSS files and Froala Editor component:

```html
<require from="froala-editor/css/froala_editor.pkgd.min.css"></require>
<require from="froala-editor/css/froala_style.min.css"></require>

<froala-editor></froala-editor>
```

- In `webpack.config.js` file include the Aurelia Froala Editor plugin:

```js
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');

plugins: [
  new AureliaPlugin(),
  new ModuleDependenciesPlugin({
    "aurelia-froala-editor": [ './froala-editor' ],
    "parent-module": [ "child-module" ],
  }),
]
```

#### Run application

```bash
npm run start
```



### With JSPM

#### Installing aurelia-cli

To configure your project with JSPM, follow the resources from Aurelia Docs: http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/setup-jspm/1 .



```bash
git clone git@github.com:aurelia/skeleton-navigation.git
cd skeleton-navigation/skeleton-esnext
npm install
jspm install -y
```

#### 

#### Add aurelia-froala-editor

- Install the aurelia plugin

```bash
jspm install aurelia-froala-editor
```

- In your `src/main.js` or `src/main.ts` file add:

```javascript
// Import jQuery
import * as $ from 'jquery';

// Import Editor.
import * as froala from 'froala-editor/js/froala_editor.pkgd.min.js';

...

// Use the aurelia-froala-editor plugin.
aurelia.use.plugin('aurelia-froala-editor');
```

- In your `src/app.html` include CSS files and Froala Editor component:

```html
<require from="froala-editor/css/froala_editor.pkgd.min.css"></require>
<require from="froala-editor/css/froala_style.min.css"></require>

<froala-editor></froala-editor>
```

- In `package.json` file add the following overrides to the `jspm` entry:

```json
"overrides": {
  "npm:froala-editor@^2.6.0": {
    "main": "js/froala-editor.min",
    "format": "global",
    "shim": {
      "js/froala-editor.min": {
        "deps": [
          "jquery"
        ]
      }
    }
  }
}
```

- In `build/bundles.js` add `aurelia-froala-editor` to `dist/aurelia` bundles:

```javascript
module.exports = {
  "bundles": {
    ...
    "dist/aurelia": {
      "includes": [
        ...
        "aurelia-froala-editor",
        ...
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": false,
        "rev": false
      }
    }
  }
}
```

#### Run application

```bash
gulp watch
```



## Usage

#### Component

In an Aurelia template, just use the aurelia-froala custom element to instantiate an editor.

```html
<froala-editor></froala-editor>
```

#### Options
All [configuration options](https://www.froala.com/wysiwyg-editor/docs/options) can be set via the config attribute.

```html
<froala-editor
	value.two-way="value"
	config.bind="{
		toolbarButtons: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html'],
		toolbarButtonsMD: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color'],
		toolbarButtonsSM: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color'],
		toolbarButtonsXS: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color'],
		fontFamilySelection: true,
		fontSizeSelection: true
	}"></froala-editor>
```

A custom config can also be passed when the plugin is loaded in `src/main.js` or `src/main.ts`file:

```javascript
// Use the aurelia-froala-editor plugin.
aurelia.use.plugin('aurelia-froala-editor', config => {
  config.options({
    toolbarInline: true
  })
});
```

#### Events

All the [event handlers](https://www.froala.com/wysiwyg-editor/docs/events) are also available:

```html
<froala-editor
	value.two-way="value"
  	event-handlers.bind = "{
    	'paste.afterCleanup': processPaste
  	}"></froala-editor>
```

## License

The `aurelia-froala-editor` project is under the Apache licence. However, to use the Froala WYSIWYG HTML Editor you should purchase a license for it. Froala has [3 different licenses](https://www.froala.com/wysiwyg-editor/pricing) for commercial use. For details please see [License Agreement](https://www.froala.com/wysiwyg-editor/terms).
