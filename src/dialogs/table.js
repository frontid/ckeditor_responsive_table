import Tools from "../Tools";

CKEDITOR.dialog.add('table_dialog', function (editor) {
  var dialog;
  var $ = jQuery;
  var table;

  /**
   * Stores the dialog user input into an accessible
   * scope to allow access to the rest of the plugin.
   *
   * @param data
   */
  var commitValue = function (data) {
    var id = this.id;

    if (!data.info){
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
      var data = {};
      this.commitContent(data);
      var info = data.info;
      var rows = parseInt(info.txtRows, 10) || 1;
      var cols = parseInt(info.txtCols, 10) || 1;
      table = Tools.buildTable(rows, cols, info.setHeader);
      editor.insertElement(table);
      Tools.moveCursorToCel(0, 0, table);


      editor.on('change', function (e) {
        var el = editor.getSelection().getStartElement();

        if (el !== null &&  el.$.tagName === "TH") {
          var _table = el.getParent().getParent().getParent();
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
          }
        ]
      }
    ],
    buttons: [CKEDITOR.dialog.okButton]
  };
});
