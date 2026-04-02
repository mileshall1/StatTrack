const dao = require("../model/GameDaoMem");

exports.getAll = function (req, res) {
  res.status(200);
  res.send(dao.readAll());
  res.end();
};

exports.get = function (req, res) {
  const gid = parseInt(req.params.gid);
  const game = dao.read(gid);

  if (game != null) {
    res.status(200);
    res.send(game);
  } else {
    res.status(404);
    res.send({ msg: "Game with this ID does not exist" });
  }

  res.end();
};

exports.postCreate = function (req, res) {
  const player = req.body.player;
  const date = req.body.date;
  const opponent = req.body.opponent;
  const points = Number(req.body.points) || 0;
  const rebounds = Number(req.body.rebounds) || 0;
  const assists = Number(req.body.assists) || 0;

  if (!player || !date || !opponent) {
    res.status(400);
    res.send({ error: "player, date, and opponent are required." });
    return;
  }

  const newGame = {
    player: String(player).trim(),
    date: String(date),
    opponent: String(opponent).trim().toUpperCase().slice(0, 3),
    points,
    rebounds,
    assists
  };

  const created = dao.create(newGame);
  res.status(201);
  res.send(created);
};

exports.putUpdate = function (req, res) {
  const gid = parseInt(req.params.gid);

  const updatedGame = {
    id: gid,
    player: String(req.body.player).trim(),
    date: String(req.body.date),
    opponent: String(req.body.opponent).trim().toUpperCase().slice(0, 3),
    points: Number(req.body.points) || 0,
    rebounds: Number(req.body.rebounds) || 0,
    assists: Number(req.body.assists) || 0
  };

  const result = dao.update(updatedGame);

  if (result != null) {
    res.status(200);
    res.send(result);
  } else {
    res.status(404);
    res.send({ msg: "Game with this ID does not exist" });
  }
};

exports.getDelete = function (req, res) {
  const gid = parseInt(req.params.gid);
  const deleted = dao.del(gid);

  if (deleted != null) {
    res.status(200);
    res.send(deleted);
  } else {
    res.status(404);
    res.send({ msg: "Game with this ID does not exist" });
  }
};