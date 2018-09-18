/**
 * @file
 * Responsive table plugin.
 */
import "babel-polyfill";
import Tools from "./Tools";

CKEDITOR.plugins.add('ckeditor_responsive_table', {
  requires: 'dialog,table',

  // Must be the same name of editor.ui.addButton('thisName')
  // Is case insensitive.
  icons: 'responsiveTable',

  init: function (editor) {
    editor.addCommand('setTable', new CKEDITOR.dialogCommand('table_dialog'));

    // On init we need to track the table changes.
    editor.on('contentDom', function () {
      let editable = editor.editable();
      let tables = editable.find('.ck-responsive-table');

      if (tables.count()) {
        tables.toArray().forEach(function (table) {
          Tools.updateHiddenHeaderLabels(table);
          editor.fire('change');
        });
      }

    });

    // When an elements is inserted we want to put the cursor on the first cell.
    editor.on('insertElement', function (payload) {
      let element = payload.data;

      if (Tools.isTable(element)) {
        Tools.moveCursorToCel(0, 0, element, editor);
        editor.fire('change');
      }

    });

    /**
     * Listen the editor changes and keep labels updated.
     */
    editor.on('change', function (payload) {
      let editable = editor.editable();
      let tables = editable.find('.ck-responsive-table');

      // The tables needs to copy the th head into data attributes at the beginning.
      tables.toArray().forEach(function (table) {
        Tools.updateHiddenHeaderLabels(table);
      });

    });

    // Ad the button to the toolbar.
    editor.ui.addButton('ResponsiveTable', {
      label: 'Responsive table',
      command: 'setTable'
    });

    // editor.addContentsCss(this.path + 'styles/plugin.css');

  }
});

CKEDITOR.dialog.add('table_dialog', function (editor) {
  let dialog;
  let table;

  /**
   * Stores the dialog user input into an accessible
   * scope to allow access to the rest of the plugin.
   *
   * @param data
   */
  let commitValue = function (data) {
    let id = this.id;

    if (!data.info) {
      data.info = {};
    }

    data.info[id] = this.getValue();
  };

  // Dialog.
  return {
    title: "Add table",
    minWidth: 360,
    minHeight: 320,

    onLoad: function () {
      dialog = this;
      this.setupContent();
    },

    /**
     * @todo remove this method.
     */
    onShow: function () {
    },

    /**
     * When confirm the dialog.
     */
    onOk: function () {
      let data = {};
      this.commitContent(data);
      table = Tools.buildTable(data.info);
      editor.insertElement(table);
    },

    contents: [
      {
        id: 'tab1',
        label: '',
        title: '',
        expand: true,
        padding: 0,
        elements: [
          {
            type: 'text',
            id: 'txtRows',
            'default': 3,
            label: "Rows",
            required: true,
            setup: function (selectedElement) {
              // this.setValue(selectedElement.$.rows.length);
            },
            commit: commitValue
          }, {
            type: 'text',
            id: 'txtCols',
            'default': 2,
            label: "Columns",
            required: true,
            setup: function (selectedTable) {
              // this.setValue(tableColumns(selectedTable));
            },
            commit: commitValue
          },
          {
            type: 'checkbox',
            id: 'useBasicTheme',
            'default': 0,
            label: "Use the basic styling",
            required: false,
            setup: function (selectedTable) {
              // this.setValue(tableColumns(selectedTable));
            },
            commit: commitValue
          }
        ]
      }
    ],
    buttons: [CKEDITOR.dialog.okButton]
  };
});
