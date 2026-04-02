const fs = require("fs");
const path = require("path");
const dao = require("./GameDaoMem");

const filePath = path.join(__dirname, "../data/games.json");

function resetFile() {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

beforeEach(() => {
  resetFile();
});

test('ReadAll will return an empty array when file has no games', function() {
  let games = dao.readAll();
  expect(games).toEqual([]);
});

test('Create adds first game with id 1', function() {
  let newGame = {
    player: "LeBron James",
    date: "2026-02-01",
    opponent: "BOS",
    points: 31,
    rebounds: 8,
    assists: 9
  };

  let created = dao.create(newGame);

  expect(created).toBeDefined();
  expect(created.id).toBe(1);

  let games = dao.readAll();
  expect(games.length).toBe(1);
  expect(games[0].player).toBe("LeBron James");
});

test('Create adds a second game with an incremented id', function() {
  dao.create({
    player: "LeBron James",
    date: "2026-02-01",
    opponent: "BOS",
    points: 31,
    rebounds: 8,
    assists: 9
  });

  let second = dao.create({
    player: "Stephen Curry",
    date: "2026-02-03",
    opponent: "LAL",
    points: 28,
    rebounds: 5,
    assists: 11
  });

  expect(second.id).toBe(2);

  let games = dao.readAll();
  expect(games.length).toBe(2);
});

test('Read returns the correct game when id exists', function() {
  let created = dao.create({
    player: "Jayson Tatum",
    date: "2026-02-05",
    opponent: "MIL",
    points: 27,
    rebounds: 7,
    assists: 4
  });

  let found = dao.read(created.id);

  expect(found).not.toBeNull();
  expect(found.player).toBe("Jayson Tatum");
  expect(found.opponent).toBe("MIL");
});

test('Read returns null when id does not exist', function() {
  let found = dao.read(999);
  expect(found).toBeNull();
});

test('update changes a game that already exists', function() {
  let created = dao.create({
    player: "Nikola Jokic",
    date: "2026-02-07",
    opponent: "PHX",
    points: 24,
    rebounds: 13,
    assists: 10
  });

  let updatedGame = {
    id: created.id,
    player: "Nikola Jokic",
    date: "2026-02-07",
    opponent: "PHX",
    points: 30,
    rebounds: 14,
    assists: 11
  };

  let result = dao.update(updatedGame);

  expect(result).not.toBeNull();
  expect(result.points).toBe(30);

  let found = dao.read(created.id);
  expect(found.points).toBe(30);
  expect(found.assists).toBe(11);
});

test('update gives us null when the ID does not exist', function() {
  let result = dao.update({
    id: 999,
    player: "Fake Player",
    date: "2026-02-10",
    opponent: "NYK",
    points: 10,
    rebounds: 2,
    assists: 1
  });

  expect(result).toBeNull();
});

test('del removes a game when the ID already exists', function() {
  let created = dao.create({
    player: "Luka Doncic",
    date: "2026-02-09",
    opponent: "SAS",
    points: 33,
    rebounds: 9,
    assists: 8
  });

  let removed = dao.del(created.id);

  expect(removed).not.toBeNull();
  expect(removed.player).toBe("Luka Doncic");

  let games = dao.readAll();
  expect(games.length).toBe(0);
});

test('del will return null when an ID doesnt exist', function() {
  let removed = dao.del(999);
  expect(removed).toBeNull();
});