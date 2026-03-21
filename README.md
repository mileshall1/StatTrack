# StatTrack Express Static Server

This project runs a Node.js + Express static server and exposes REST endpoints for reading and writing game data.

## Requirements

- Node.js 18+ (or newer)

## Setup

1. Install dependencies:

	npm install

2. Start the server:

	npm start

3. Open in browser:

	http://localhost:3000

## What is included

- Static files served from `public/`
- REST endpoints:
	- `GET /api/games`
	- `POST /api/games`
- JSON data source: `data/games.json` (contains 8 NBA game items)
- Combined add + saved page: `savedGames.html`

## Assignment mapping

- **Node JS Express Static Server**: `server.js` serves static pages from `public/`
- **RESTful Actions**:
	- `GET /api/games` returns array data from `data/games.json`
	- `POST /api/games` appends a game item to `data/games.json`
- **Front-end Display + Add Form**: `savedGames.html` lets you add a game and view saved games on one page