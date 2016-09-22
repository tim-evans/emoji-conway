import GameBoard from './game-board';

function Conway {
  this.board = new GameBoard();
  let lifeform = document.querySelector('#lifeform').value;
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
  start() {
    document.querySelector('button').disabled = true;
    this.next();
  },

  next() {
    let { M, N, liveCells } = this.board;

    $.ajax({
      url: 'http://localhost:3000/api/conway/generation',
      jsonp: 'callback',
      dataType: 'jsonp',
      data: { M, N, liveCells },
      success: (response) => {
        this.board.setState(response);
        if (this.board.liveCells.length > 0) {
          setTimeout(() => this.next(), 100);
        } else {
          document.querySelector('button').removeAttribute('disabled');
        }
      }
    });
  }
};

export default Conway;
