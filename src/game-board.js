function GameBoard() {
  this.liveCells = [];
  this.element = document.querySelector('table');
  this._click = (evt) => this.click(evt);
  this.element.addEventListener('click', this._click, false);
}

GameBoard.prototype = {
  render() {
    let table = this.element;
    table.innerHTML = '';

    let activeCells = this.liveCells.reduce(function (activeCells, cell) {
      let [x, y] = cell;
      activeCells[y] = activeCells[y] || [];
      activeCells[y][x] = true;
      return activeCells;
    }, []);

    for (let row = 0, rowCount = this.N; row < rowCount; row++) {
      let tr = document.createElement('tr');
      for (let col = 0, colCount = this.M; col < colCount; col++) {
        let td = document.createElement('td');
        td.dataset.status = (activeCells[row] && activeCells[row][col]) ? 'alive' : 'dead';
        td.dataset.x = col;
        td.dataset.y = row;
        if (td.dataset.status === 'alive') {
          td.innerHTML = this.lifeform;
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    this.oldCells = this.liveCells;
  },

  beginEditing() {

  },

  click(evt) {
    let cell = evt.target;
    if (cell.tagName.toUpperCase() === 'TD') {
      let x = parseInt(cell.dataset.x, 10);
      let y = parseInt(cell.dataset.y, 10);
      let alive = cell.dataset.status === 'alive';
      let liveCells = Object.assign([], this.liveCells);

      if (alive) {
        let deadCell = liveCells.find(function (cell) {
          return cell[0] === x && cell[1] === y;
        });
        liveCells.splice(liveCells.indexOf(deadCell), 1)
      } else {
        liveCells.push([x, y]);
      }
      this.setState({ liveCells });
    }
  },

  setState(key, value) {
    let { M, N } = this;
    if (typeof key === 'object') {
      Object.keys(key).forEach((k) => {
        this[k] = key[k];
      });
    } else {
      this[key] = value;
    }

    if (this.element && this.M == M && this.N == N) {
      this.rerender();
    } else {
      this.render();
    }
  },

  rerender() {
    let element = this.element;

    this.oldCells.forEach(function ([x, y]) {
      let td = element.querySelectorAll('tr')[y].querySelectorAll('td')[x];
      td.innerHTML = '';
      td.dataset.status = 'dead';
    });

    this.liveCells.forEach(([x, y]) => {
      let td = element.querySelectorAll('tr')[y].querySelectorAll('td')[x];
      td.innerHTML = this.lifeform;
      td.dataset.status = 'alive';
    });

    this.oldCells = this.liveCells;
  }
};

export default GameBoard;
