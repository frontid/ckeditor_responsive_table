(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @file
 * Responsive table plugin.
 */

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
  var commitValue = function () {
    function commitValue(data) {
      var id = this.id;

      if (!data.info) {
        data.info = {};
      }

      data.info[id] = this.getValue();
    }

    return commitValue;
  }();

  /**
   * Generates the DOM table.
   *
   * @param {Number} rows
   * @param {Number} cols
   * @param setHeader
   *
   * @return {CKEDITOR.dom.element}
   */
  function buildTable(rows, cols, setHeader) {
    var table = new CKEDITOR.dom.element("table");
    table.addClass('table');
    table.addClass('ck-responsive-table');
    table.addClass('cke_show_border');

    if (setHeader === true) {
      var header = new CKEDITOR.dom.element("thead");
      var tr = new CKEDITOR.dom.element("tr");

      for (var k = 0; k < cols; k++) {
        var th = new CKEDITOR.dom.element("th");
        tr.append(th);
      }

      header.append(tr);
      table.append(header);
    }

    for (var i = 0; i < rows; i++) {
      var $row = new CKEDITOR.dom.element("tr");

      for (var j = 0; j < cols; j++) {
        var $col = new CKEDITOR.dom.element("td");
        $row.append($col);
      }

      table.append($row);
    }

    return table;
  }

  /**
   * @docme
   *
   * @param posX
   * @param posY
   * @param table
   */
  function moveCursorToCel(posX, posY, table) {
    setTimeout(function () {
      var firstCell = new CKEDITOR.dom.element(table.$.rows[posX].cells[posY]);
      var range = editor.createRange();
      range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
      range.select();
    }, 0);
  }

  /**
   * @docme
   *
   * @param _table Ckeditor's table element.
   */
  function updateHiddenHeaderLabels(_table) {
    var $table = $(_table.$);
    var columnTh = $table.find("thead th");

    columnTh.each(function () {
      var $th = $(this);
      var columnIndex = $(this).index() + 1;
      var $cols = $table.find('tr td:nth-child(' + columnIndex + ')');

      $cols.each(function () {
        var $col = $(this);
        $col.attr('data-label', $th.text());
      });
    });
  }

  // Dialog.
  return {
    title: "Add table",
    minWidth: 360,
    minHeight: 320,

    onLoad: function () {
      function onLoad() {
        dialog = this;
        this.setupContent();
      }

      return onLoad;
    }(),

    /**
     * @todo remove this method.
     */
    onShow: function () {
      function onShow() {}

      return onShow;
    }(),

    /**
     * When confirm the dialog.
     */
    onOk: function () {
      function onOk() {
        var data = {};
        this.commitContent(data);
        var info = data.info;
        var rows = parseInt(info.txtRows, 10) || 1;
        var cols = parseInt(info.txtCols, 10) || 1;
        table = buildTable(rows, cols, info.setHeader);
        editor.insertElement(table);
        moveCursorToCel(0, 0, table);

        editor.on('change', function (e) {
          var el = editor.getSelection().getStartElement();

          if (el !== null && el.$.tagName === "TH") {
            var _table = el.getParent().getParent().getParent();
            if (_table.hasClass('ck-responsive-table')) {
              updateHiddenHeaderLabels(_table);
            }
          }
        });
      }

      return onOk;
    }(),

    contents: [{
      id: 'tab1',
      label: '',
      title: '',
      expand: true,
      padding: 0,
      elements: [{
        type: 'text',
        id: 'txtRows',
        'default': 3,
        label: "Rows",
        required: true,
        setup: function () {
          function setup(selectedElement) {
            // this.setValue(selectedElement.$.rows.length);
          }

          return setup;
        }(),
        commit: commitValue
      }, {
        type: 'text',
        id: 'txtCols',
        'default': 2,
        label: "Columns",
        required: true,
        setup: function () {
          function setup(selectedTable) {
            // this.setValue(tableColumns(selectedTable));
          }

          return setup;
        }(),
        commit: commitValue
      }, {
        type: 'checkbox',
        id: 'setHeader',
        'default': 0,
        label: "Add a header",
        required: false,
        setup: function () {
          function setup(selectedTable) {
            // this.setValue(tableColumns(selectedTable));
          }

          return setup;
        }(),
        commit: commitValue
      }]
    }],
    buttons: [CKEDITOR.dialog.okButton]
  };
});

},{}]},{},[1])//# sourceMappingURL=table.js.map
