(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @file
 * Responsive table plugin.
 */

CKEDITOR.plugins.add('ckeditor_responsive_table', {
  requires: 'dialog,table',

  // Must be the same name of editor.ui.addButton('thisName')
  // Is case insensitive.
  icons: 'responsiveTable',

  init: function () {
    function init(editor) {
      var $ = jQuery;

      /**
       * Updates the hidden labels (only visible at mobile).
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

      editor.addCommand('setTable', new CKEDITOR.dialogCommand('table_dialog'));
      CKEDITOR.dialog.add('table_dialog', this.path + 'dialogs/table.js');

      // On init we need to track the table changes.
      editor.on('change', function (e) {
        var el = editor.getSelection().getStartElement();

        if (el !== null && el.$.tagName === "TH") {
          var _table = el.getParent().getParent().getParent();
          if (_table.hasClass('ck-responsive-table')) {
            updateHiddenHeaderLabels(_table);
          }
        }
      });

      // Ad the button to the toolbar.
      editor.ui.addButton('ResponsiveTable', {
        label: 'Responsive table',
        command: 'setTable'
      });
    }

    return init;
  }()
});

},{}]},{},[1])//# sourceMappingURL=plugin.js.map
