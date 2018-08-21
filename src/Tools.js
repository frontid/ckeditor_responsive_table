class Tools {

  constructor() {
  }

  /**
   * Updates the hidden labels (only visible at mobile).
   *
   * @param $table Ckeditor's table element.
   */
  static updateHiddenHeaderLabels($table) {
    let columnTh = $table.find("thead th");

    columnTh.toArray().forEach(function (th) {
      let $th = th;
      let columnIndex = $th.getIndex() + 1;
      let $cols = $table.find('tr td:nth-child(' + columnIndex + ')');

      $cols.toArray().forEach(function (col) {
        let $col = col.$;
        $col.setAttribute('data-label', $th.getText());
      });

    });
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
  static buildTable(rows, cols, setHeader) {
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
   * Relocates the caret into the first cell.
   *
   * @param posX
   * @param posY
   * @param table
   * @param editor
   */
  static moveCursorToCel(posX, posY, table, editor) {
    setTimeout(function () {
      var firstCell = new CKEDITOR.dom.element(table.$.rows[posX].cells[posY]);
      var range = editor.createRange();
      range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
      range.select();
    }, 0);
  }


}

export {Tools as default}