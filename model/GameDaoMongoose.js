const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    player: String,
    date: String,
    opponent: String,
    points: Number,
    rebounds: Number,
    assists: Number
});

const Game = mongoose.model('Game', gameSchema);

const readAll = async function(){
    const games = await Game.find({});
    return games;
}
exports.readAll = readAll;

const read = async function(gid){
    const game = await Game.findById(gid);
    return game;
}

exports.read = read;

exports.create = async function(game){
    const mongogame = new Game(game);
    await mongogame.save();
    return mongogame;
}

exports.update = async function(game){
    const mongogame = await Game.findById(game.id);
    if(mongogame == null) return null;

    mongogame.player = game.player;
    mongogame.date = game.date;
    mongogame.opponent = game.opponent;
    mongogame.points = game.points;
    mongogame.rebounds = game.rebounds;
    mongogame.assists = game.assists;

    await mongogame.save();
    return mongogame;
}

exports.del = async function(gid){
    const game = await Game.findByIdAndDelete(gid);
    return game;
}

exports.deleteAll = async function(){
    await Game.deleteMany({});
}


   