# CKEditor responsible table
CKEditor responsible table plugin.

[See the working sample here](https://frontid.github.io/ckeditor_responsive_table/sample/)

# Usage

```html
<!-- Plugin required CSS file.-->
<link rel="stylesheet" href="../dist/styles/plugin.css">
<!-- Plugin optional CSS file. Provides a basic styling. -->
<link rel="stylesheet" href="../dist/styles/basic-theme.css">
```

Add the plugin at your `config.js`

```javascript
CKEDITOR.plugins.addExternal('ckeditor_responsive_table', '/ckeditor_responsive_table/dist/plugin.js');
config.extraPlugins = ['ckeditor_responsive_table'];

config.toolbar = [
    {name: 'basicstyles', items: ['ResponsiveTable']}
  ];
```
