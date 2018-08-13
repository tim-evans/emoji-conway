import GameBoard from './game-board';

export default class Conway {
  constructor() {
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

  start() {
    document.querySelector('button').disabled = true;
    this.next();
  }

  next() {
    let { M, N, liveCells, generation } = this.board;

    fetch('http://localhost:3000/api/conway/generation', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ M, N, liveCells, generation })
    }).then((response) => {
      return response.json();
    }).then((boardState) => {
      this.board.setState(boardState);
      this.board.generation++;
      if (this.board.liveCells.length > 0) {
        setTimeout(() => this.next(), 100);
      } else {
        document.querySelector('button').removeAttribute('disabled');
      }
    });
  }
};
