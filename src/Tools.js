class Tools {

  constructor() {
  }


  /**
   * Checks if the element is a responsive table.
   */
  static isTable(el) {
    return el.hasClass('ck-responsive-table');
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
   * @param {Object} data
   *
   * @return {CKEDITOR.dom.element}
   */
  static buildTable(data) {
    let rows = parseInt(data.txtRows, 10) || 1;
    let cols = parseInt(data.txtCols, 10) || 1;

    let table = new CKEDITOR.dom.element("table");
    table.addClass('table');
    table.addClass('ck-responsive-table');
    table.addClass('cke_show_border');

    if (data.useBasicTheme === true) {
      table.addClass('ckrt-basic-theme');
    }

    let header = new CKEDITOR.dom.element("thead");
    let tr = new CKEDITOR.dom.element("tr");

    for (let k = 0; k < cols; k++) {
      let th = new CKEDITOR.dom.element("th");
      tr.append(th);
    }

    header.append(tr);
    table.append(header);

    for (let i = 0; i < rows; i++) {
      let $row = new CKEDITOR.dom.element("tr");

      for (let j = 0; j < cols; j++) {
        let $col = new CKEDITOR.dom.element("td");
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
      let firstCell = new CKEDITOR.dom.element(table.$.rows[posX].cells[posY]);
      let range = editor.createRange();
      range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
      range.select();
    }, 0);
  }


}

export {Tools as default}