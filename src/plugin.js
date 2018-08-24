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
    editor.on('change', function (e) {
      let el = editor.getSelection().getStartElement();

      if (el !== null && el.$.tagName === "TH") {
        let _table = el.getParent().getParent().getParent();
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
      Tools.moveCursorToCel(0, 0, table, editor);

      /**
       * @docme
       */
      editor.on('change', function (e) {
        let el = editor.getSelection().getStartElement();

        if (el !== null && el.$.tagName === "TH") {
          let _table = el.getParent().getParent().getParent();
          if (_table.hasClass('ck-responsive-table')) {
            Tools.updateHiddenHeaderLabels(_table);
          }
        }

      });
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
            id: 'setHeader',
            'default': 0,
            label: "Add a header",
            required: false,
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
