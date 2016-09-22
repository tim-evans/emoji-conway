function GameBoard() {
    var _this = this;
    this.liveCells = [];
    this.element = document.querySelector('table');
    this._click = function (evt) { return _this.click(evt); };
    this.element.addEventListener('click', this._click, false);
}
GameBoard.prototype = {
    render: function () {
        var table = this.element;
        table.innerHTML = '';
        var activeCells = this.liveCells.reduce(function (activeCells, cell) {
            var x = cell[0], y = cell[1];
            activeCells[y] = activeCells[y] || [];
            activeCells[y][x] = true;
            return activeCells;
        }, []);
        for (var row = 0, rowCount = this.N; row < rowCount; row++) {
            var tr = document.createElement('tr');
            for (var col = 0, colCount = this.M; col < colCount; col++) {
                var td = document.createElement('td');
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
    beginEditing: function () {
    },
    click: function (evt) {
        var cell = evt.target;
        if (cell.tagName.toUpperCase() === 'TD') {
            var x_1 = parseInt(cell.dataset.x, 10);
            var y_1 = parseInt(cell.dataset.y, 10);
            var alive = cell.dataset.status === 'alive';
            var liveCells = Object.assign([], this.liveCells);
            if (alive) {
                var deadCell = liveCells.find(function (cell) {
                    return cell[0] === x_1 && cell[1] === y_1;
                });
                liveCells.splice(liveCells.indexOf(deadCell), 1);
            }
            else {
                liveCells.push([x_1, y_1]);
            }
            this.setState({ liveCells });
        }
    },
    setState: function (key, value) {
        var _this = this;
        var _a = this, M = _a.M, N = _a.N;
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                _this[k] = key[k];
            });
        }
        else {
            this[key] = value;
        }
        if (this.element && this.M == M && this.N == N) {
            this.rerender();
        }
        else {
            this.render();
        }
    },
    rerender: function () {
        var _this = this;
        var element = this.element;
        this.oldCells.forEach(function (_a) {
            var x = _a[0], y = _a[1];
            var td = element.querySelectorAll('tr')[y].querySelectorAll('td')[x];
            td.innerHTML = '';
            td.dataset.status = 'dead';
        });
        this.liveCells.forEach(function (_a) {
            var x = _a[0], y = _a[1];
            var td = element.querySelectorAll('tr')[y].querySelectorAll('td')[x];
            td.innerHTML = _this.lifeform;
            td.dataset.status = 'alive';
        });
        this.oldCells = this.liveCells;
    }
};
export default GameBoard;
