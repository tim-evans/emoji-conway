import Conway from './conway';

let conway = new Conway();
conway.board.setState({
  liveCells: [
    [13, 13], [13, 14], [13, 15], [13, 16], [13, 17],
    [15, 13], [15, 17],
    [17, 13], [17, 14], [17, 15], [17, 16], [17, 17],
  ]
});

document.querySelector('#m').addEventListener('input', function () {
  conway.board.setState({ M: this.value });
});

document.querySelector('#n').addEventListener('input', function () {
  conway.board.setState({ N: this.value });
});

document.querySelector('#lifeform').addEventListener('input', function () {
  document.querySelector('#lifeform-character').innerHTML = this.value;
  conway.board.setState({ lifeform: this.value });
});

document.querySelector('button').addEventListener('click', function () {
  conway.start();
});
