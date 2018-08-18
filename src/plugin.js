﻿/**
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
});
