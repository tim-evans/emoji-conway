function Conway() {}

Conway.prototype = {
  render() {
    let body = document.body;
    let table = document.createElement('table');

    for (let row = 0, rowCount = this.M; row < rowCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0, colCount = this.N; col < colCount; col++) {
        let td = document.createElement('td');
        td.innerHTML = '&nbsp;';
        if (this.isActive(row, col)) {
          td.classList.add('alive');
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    body.appendChild(table);
    this.element = table;

    this.oldCells = this.liveCells;
  },

  isActive(m, n) {
    return this.activeCells && this.activeCells[m] && this.activeCells[m][n];
  },

  get liveCells() {
    return this._liveCells;
  },

  set liveCells(cells) {
    this._liveCells = cells;
    this.activeCells = cells.reduce(function (activeCells, cell) {
      let [x, y] = cell;
      activeCells[x] = activeCells[x] || [];
      activeCells[x][y] = true;
      return activeCells;
    }, []);

    return cells;
  },

  setState(key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((k) => {
        this[k] = key[k];
      });
    } else {
      this[key] = value;
    }

    if (this.element) {
      this.rerender();
    } else {
      this.render();
    }
  },

  rerender() {
    let element = this.element;

    this.oldCells.forEach(function ([x, y]) {
      let td = element.querySelectorAll('tr')[x].querySelectorAll('td')[y];
      td.classList.remove('alive');
    });

    this.liveCells.forEach(function ([x, y]) {
      let td = element.querySelectorAll('tr')[x].querySelectorAll('td')[y];
      td.classList.add('alive');
    });

    this.oldCells = this.liveCells;
  }
}

export default Conway;

