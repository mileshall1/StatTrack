const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = __dirname;
const dataFile = path.join(__dirname, "data", "games.json");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.static(staticDir));

const readGames = async () => {
  const fileContents = await fs.readFile(dataFile, "utf8");
  const games = JSON.parse(fileContents);

  if (!Array.isArray(games)) {
    throw new Error("Data source is not an array.");
  }

  return games;
};

const writeGames = async (games) => {
  await fs.writeFile(dataFile, `${JSON.stringify(games, null, 2)}\n`, "utf8");
};

// Learned this from W3schools - https://www.w3schools.com/nodejs/nodejs_rest_api.asp
app.get("/api/games", async (_req, res) => {
  try {
    const games = await readGames();
    return res.json(games);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load games data." });
  }
});
// Learned from W3schools - https://www.w3schools.com/nodejs/nodejs_rest_api.asp
app.post("/api/games", async (req, res) => {
  try {
    const { player, date, opponent, points, rebounds, assists } = req.body || {};

    if (!player || !date || !opponent) {
      return res.status(400).json({ error: "player, date, and opponent are required." });
    }

    const newGame = {
      id: Date.now(),
      player: String(player).trim(),
      date: String(date),
      opponent: String(opponent).trim().toUpperCase().slice(0, 3),
      points: Number(points) || 0,
      rebounds: Number(rebounds) || 0,
      assists: Number(assists) || 0,
    };

    const games = await readGames();
    games.unshift(newGame);
    await writeGames(games);

    return res.status(201).json(newGame);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save game data." });
  }
});

app.delete("/api/games", async (_req, res) => {
  try {
    await writeGames([]);
    return res.status(200).json({ message: "All games cleared." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to clear games data." });
  }
});

app.post("/api/games/clear", async (_req, res) => {
  try {
    await writeGames([]);
    return res.status(200).json({ message: "All games cleared." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to clear games data." });
  }
});

app.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
});
