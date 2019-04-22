# Aurelia Froala WYSIWYG HTML Editor

[![npm](https://img.shields.io/npm/v/aurelia-froala-editor.svg)](https://www.npmjs.com/package/aurelia-froala-editor)
[![npm](https://img.shields.io/npm/dm/aurelia-froala-editor.svg)](https://www.npmjs.com/package/aurelia-froala-editor)
[![npm](https://img.shields.io/npm/l/aurelia-froala-editor.svg)](https://www.npmjs.com/package/aurelia-froala-editor)

>This package provides a custom element for the [Froala WYSIWYG HTML Editor](https://www.froala.com/wysiwyg-editor) in [Aurelia](http://aurelia.io/).

## Table of contents

1. [Installation instructions](#installation-instructions)
2. [Update editor instructions](#update-editor-instructions)
3. [Integration](#integration)
   1. [With Aurelia CLI](#with-aurelia-cli)
   2. [With Webpack](#with-webpack)
   3. [With JSPM](#with-jspm)
4. [Usage](#usage)
5. [License](#license)

## Installation instructions

Install `aurelia-froala-editor` from `npm`

```bash
npm install aurelia-froala-editor --save
```

## Update editor instructions

```bash
npm update froala-editor
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

// Use the aurelia-froala-editor plugin.
aurelia.use.plugin('aurelia-froala-editor');
```

- In your `src/app.html` include CSS files and Froala Editor component:

```html
<template>
  <require from="bootstrap/dist/css/bootstrap.min.css"></require>
  <require from="../node_modules/font-awesome/css/font-awesome.min.css"> </require>
  <require from="froala-editor/css/froala_editor.pkgd.min.css"></require>
<require from="froala-editor/css/froala_style.min.css"></require>
  <require from="./styles.css"></require>

  <froala-editor id="edit"></froala-editor>
</template>

```

- In `aurelia_project/aurelia.json` file set the builder loader plugins stub to `false`

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

- In `aurelia_project/aurelia.json` add to `vendor_bundle` dependencies

```javascript
          {
            "name": "font-awesome",
            "path": "../node_modules/font-awesome/css",
            "main": "font-awesome.css"
          },
         
          {
            "name": "froala-editor",
            "path": "../node_modules/froala-editor",
            "main": "js/froala_editor.pkgd.min.js",
            "resources": [
              "./js/**/*.{js}",
              "./css/froala_editor.pkgd.min.css",
              "./css/froala_style.min.css"
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
              "froala-editor"
              
            ]
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
...

// Use the aurelia-froala-editor plugin.
aurelia.use.plugin(PLATFORM.moduleName('aurelia-froala-editor'));
```

- In your `src/app.html` include CSS files and Froala Editor component:

```html
<require from="froala-editor/css/froala_editor.pkgd.min.css"></require>
<require from="froala-editor/css/froala_style.min.css"></require>

<froala-editor id="edit"></froala-editor>
```

- In `webpack.config.js` file include the Aurelia Froala Editor plugin:

```js
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');

  resolve: {
    extensions: ['.js'],
    modules:[srcDir,'../node_modules/froala-editor/js','node_modules'],
     alias: {
       "FroalaEditor": 'froala_editor.pkgd.min.js'
     }
  },
plugins: [
  new AureliaPlugin(),
   new ProvidePlugin({
      FroalaEditor: 'froala_editor.pkgd.min.js',
      'Promise': 'bluebird',
      Popper: ['popper.js', 'default'] // Bootstrap 4 Dependency.
    }),
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
jspm install npm:froala-editor -o "{format: 'global'}"
```

- In your `src/main.js` or `src/main.ts` file add:

```javascript

// Use the aurelia-froala-editor plugin.
aurelia.use.plugin('aurelia-froala-editor');
```

- In your `src/app.html` include CSS files and Froala Editor component:

```html
<require from="froala-editor/css/froala_editor.pkgd.min.css"></require>
<require from="froala-editor/css/froala_style.min.css"></require>

<froala-editor id="edit"></froala-editor>
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
