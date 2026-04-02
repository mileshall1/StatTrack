//All of our game data was stored in a JSON file, so we had to read the file using fs. 
// We converted it into a JavaScript object using JSON.parse, and then we could manipulate it as needed. 
// After making changes to the data, we wrote it back to the file using fs.writeFileSync, converting the JavaScript object using JSON.stringify. 
// We used stringify to save everything back as well.

const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "../data/games.json");

function readFile() {
  const data = fs.readFileSync(filePath, "utf8");
 
  return JSON.parse(data);
}

function writeFile(games) {
  fs.writeFileSync(filePath, JSON.stringify(games, null, 2));
}

function pos(id, games) {
  const targetId = Number(id);
  for (let i = 0; i < games.length; i++) {
    if (Number(games[i].id) === targetId) {
      return i;
    }
  }
  return -1;
}

exports.readAll = function () {
  return readFile();
};

exports.create = function (game) {
  const games = readFile();

  if (games.length === 0) {
    game.id = 1;
  } else {
    game.id = games[games.length - 1].id + 1;
  }

  games.push(game);
  writeFile(games);
  return game;
};

exports.read = function (id) {
  const games = readFile();
  const index = pos(id, games);

  if (index >= 0) {
    return games[index];
  }

  return null;
};

exports.update = function (game) {
  const games = readFile();
  const index = pos(game.id, games);

  if (index >= 0) {
    games[index] = game;
    writeFile(games);
    return game;
  }

  return null;
};

exports.del = function (id) {
  const games = readFile();
  const index = pos(id, games);

  if (index >= 0) {
    const removed = games[index];
    games.splice(index, 1);
    writeFile(games);
    return removed;
  }

  return null;
};