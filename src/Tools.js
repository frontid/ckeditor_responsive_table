class Tools {

  /**
   * Updates the hidden labels (only visible at mobile).
   *
   * @param _table Ckeditor's table element.
   */
  static updateHiddenHeaderLabels(_table) {
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

  /**
   * @docme
   *
   * @param posX
   * @param posY
   * @param table
   */
  moveCursorToCel(posX, posY, table) {
    setTimeout(function () {
      var firstCell = new CKEDITOR.dom.element(table.$.rows[posX].cells[posY]);
      var range = editor.createRange();
      range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
      range.select();
    }, 0);
  }

  /**
   * Generates the DOM table.
   *
   * @param {Number} rows
   * @param {Number} cols
   * @param setHeader
   *
   * @return {CKEDITOR.dom.element}
   */
  buildTable(rows, cols, setHeader) {
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
}

// Export the class.
export {Tools as default}