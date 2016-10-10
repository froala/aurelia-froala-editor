# aurelia-froala-editor

>This package provides a custom element for the [Froala editor](https://www.froala.com/wysiwyg-editor) in [Aurelia](http://aurelia.io/).

## Install

Run

```bash
jspm install aurelia-froala-editor
```

In your main.js or main.ts, extend the code

```javascript
aurelia.use
	.standardConfiguration()
```

with

```javascript
.plugin('aurelia-froala-editor', config => {});
```

In an Aurelia template, just use the aurelia-froala custom element to instantiate an editor. All [configuration options](https://www.froala.com/wysiwyg-editor/docs/options) can be set via the config attribute. 

```html
<aurelia-froala value.two-way="value"
	config.bind="{
		toolbarButtons: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html'],
		toolbarButtonsMD: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color'],
		toolbarButtonsSM: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color'],
		toolbarButtonsXS: ['redo' , '|', 'fontFamily', '|', 'fontSize', '|', 'paragraphFormat', 'color'],
		fontFamilySelection: true,
		fontSizeSelection: true
	}">
</aurelia-froala>
```

All the [event handlers](https://www.froala.com/wysiwyg-editor/docs/events) are also available:

```html
<aurelia-froala value.two-way="value"
	event-handlers.bind = "{
		'paste.afterCleanup': processPaste
	}>"
</aurelia-froala>
```

## Global configuration

To use the editor, you'll need a licnse (see [Froala Website](https://www.froala.com/wysiwyg-editor) for details). Once you have obtained one, you can activate it using this snippet:

```javascript
config.setLicense("Your license key");
``` 

[Plugins](http://froala.com/wysiwyg-editor/docs/concepts/custom/plugin), [custom buttons](http://froala.com/wysiwyg-editor/docs/concepts/custom/button) and other [languages](https://www.froala.com/wysiwyg-editor/languages) need to be activated globally. This is done in the main.js or main.ts:

```javascript
aurelia.use
	.standardConfiguration()
	.plugin('aurelia-froala', config => {
		// Load plugins
		config.addPlugin("colors");
		config.addPlugin("align");
		config.addPlugin("code_beautifier");
		config.addPlugin("image");
		config.addPlugin("image_manager"));

		// Create a custom button
		config.global(editor => {
			// Define an icon
			editor.DefineIcon("insertFromServerIcon", {NAME: "folder"})
			// Register the new command. It can now be added to a toolbar using the command 'insertFromServer'
			editor.RegisterCommand('insertFromServer', {
				title: 'Insert from server',
				icon: 'insertFromServerIcon',
				undo: true,
				focus: true,
				refreshAfterCallback: true,
				callback: function () {
					console.log("Insert from server");
				}
			});
		});

		// Add another language
		config.addLanguage("de", {
			"Insert from server": "Vom Server einfügen",
		})
	})
}
```

If you add custom plugins or commands you might want to localize them. This is done by providing the localized strings in the second parameter of the addLanguage method.

The languages of all editors on a page are automatically adjusted when the global aurelia language is changed. You don't have to perform any additional magic. 

## License

The `aurelia-froala-editor` project is under the Apache licence. However, to use the Froala WYSIWYG HTML Editor you should purchase a license for it. Froala has [3 different licenses](https://www.froala.com/wysiwyg-editor/pricing) for commercial use. For details please see [License Agreement](https://www.froala.com/wysiwyg-editor/terms).
