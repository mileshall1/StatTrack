const db = require("./model/DbConnection")
db.connect();
const express = require("express");
const path = require("path");
const gameCont = require("./controller/UserController");

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// We wanted to explain this since you commented on it last time, we planned on expanding upon this project when we finished this course. Last semester in CS491, we built a mobile app with react native and thought that we could maybe do the same with this. This essneitally just allowed the frontend to call routes if it was running somwehre else. We understand if this wasn't necessary for the current project and how it may have caused any confusion but we were thinking ahead.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.static(staticDir));

app.get("/api/games", gameCont.getAll);
app.get("/api/games/:gid", gameCont.get);
app.post("/api/games", gameCont.postCreate);
app.put("/api/games/:gid", gameCont.putUpdate);
app.delete("/api/games/:gid", gameCont.getDelete);

app.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
});