import Tools from "./Tools";

/**
 * @file
 * Responsive table plugin.
 */

CKEDITOR.plugins.add('ckeditor_responsive_table', {
  requires: 'dialog,table',

  // Must be the same name of editor.ui.addButton('thisName')
  // Is case insensitive.
  icons: 'responsiveTable',

  init: function (editor) {
    var $ = jQuery;

    editor.addCommand('setTable', new CKEDITOR.dialogCommand('table_dialog'));
    CKEDITOR.dialog.add('table_dialog', this.path + 'dialogs/table.js');

    // On init we need to track the table changes.
    editor.on('change', function (e) {
      var el = editor.getSelection().getStartElement();

      if (el !== null && el.$.tagName === "TH") {
        var _table = el.getParent().getParent().getParent();
        if (_table.hasClass('ck-responsive-table')) {
          Tools.updateHiddenHeaderLabels(_table);
        }
      }

    });


    // Ad the button to the toolbar.
    editor.ui.addButton('ResponsiveTable', {
      label: 'Responsive table',
      command: 'setTable'
    });

  }
});
