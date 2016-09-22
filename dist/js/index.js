import GameBoard from './game-board';
function Conway() {
    this.board = new GameBoard();
    var lifeform = document.querySelector('#lifeform').value;
    document.querySelector('button').removeAttribute('disabled');
    document.querySelector('#lifeform-character').innerHTML = lifeform;
    this.board.setState({
        M: parseInt(document.querySelector('#m').value, 10),
        N: parseInt(document.querySelector('#n').value, 10),
        lifeform,
        liveCells: []
    });
}
Conway.prototype = {
    start: function () {
        document.querySelector('button').disabled = true;
        this.next();
    },
    next: function () {
        var _this = this;
        var _a = this.board, M = _a.M, N = _a.N, liveCells = _a.liveCells;
        $.ajax({
            url: 'http://localhost:3000/api/conway/generation',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: { M, N, liveCells },
            success: function (response) {
                _this.board.setState(response);
                if (_this.board.liveCells.length > 0) {
                    setTimeout(function () { return _this.next(); }, 100);
                }
                else {
                    document.querySelector('button').removeAttribute('disabled');
                }
            }
        });
    }
};
export default Conway;
