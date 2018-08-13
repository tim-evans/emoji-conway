var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function nextGeneration(M, N, liveCells) {
  var generation = [];
  var map = liveCells.reduce(function (map, cell) {
    var x = cell[0];
    var y = cell[1];
    map[y] = map[y] || [];
    map[y][x] = true;
    return map;
  }, {});

  function isActive(x, y) {
    return map[y] && map[y][x];
  }

  var neighbors = 0;
  for (var x = 0; x < M; x++) {
    for (var y = 0; y < N; y++) {
      neighbors = 0;
      if (isActive(x - 1, y - 1)) neighbors++;
      if (isActive(x - 1, y)) neighbors++;
      if (isActive(x - 1, y + 1)) neighbors++;
      if (isActive(x, y + 1)) neighbors++;
      if (isActive(x + 1, y + 1)) neighbors++;
      if (isActive(x + 1, y)) neighbors++;
      if (isActive(x + 1, y - 1)) neighbors++;
      if (isActive(x, y - 1)) neighbors++;

      if (neighbors === 2 && isActive(x, y)) {
        generation.push([x, y]);
      }
      if (neighbors === 3) {
        generation.push([x, y]);
      }
    }
  }

  return generation;
}

app.options('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendStatus(204);
});

app.post('/api/conway/generation', function (req, res) {
  var M = req.body.M;
  var N = req.body.N;
  var liveCells = req.body.liveCells;
  if (req.body.generation === 0) {
    console.log('🌱 Starting a new world!');
  }

  res.send(JSON.stringify({
    M: M,
    N: N,
    liveCells: nextGeneration(M, N, liveCells)
  }));
});

app.get('*', function (_, res) {
  res.sendStatus(404);
});

app.all('*', function (_, res) {
  res.sendStatus(403);
});

app.listen(3000, function () {
  console.log('✌️ Conway server listening on port 3000');
});
