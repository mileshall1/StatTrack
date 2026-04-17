const dao = require('./GameDaoMongoose');
const dbcon = require('./DbConnection');

beforeAll(async () => {
    await dbcon.connect();
    await dao.deleteAll();
});

afterAll(async function(){
    await dbcon.disconnect();
});

afterEach(async function(){
    await dao.deleteAll();
});

test('create a game', async function(){
    let newgame = {
        player: 'Michael Jordan',
        date: '1996-12-25',
        opponent: 'New York Knicks',
        points: 45,
        rebounds: 5,
        assists: 7
    }
    let created = await dao.create(newgame);
    let found = await dao.read(created._id);

    expect(created._id).toBeDefined();
    expect(found._id).toEqual(created._id);
    expect(found.player).toEqual(newgame.player);
    expect(found.date).toEqual(newgame.date);
    expect(found.opponent).toEqual(newgame.opponent);
    expect(found.points).toEqual(newgame.points);
    expect(found.rebounds).toEqual(newgame.rebounds);
    expect(found.assists).toEqual(newgame.assists);
});

test('delete a game', async function(){
    let newgame = {
        player: 'Michael Jordan',
        date: '1996-12-25',
        opponent: 'New York Knicks',
        points: 45,
        rebounds: 5,
        assists: 7
    }
    let created = await dao.create(newgame);
    let foundBeforDel = await dao.read(created._id);
    let deleted = await dao.del(created._id);
    let foundAfterDel = await dao.read(created._id);

    expect(foundBeforDel._id).not.toBeNull();
    expect(foundAfterDel).toBeNull();
    expect(deleted._id).toEqual(created._id);
});

test('read all games', async function(){
    let newgame1 = {
        player: 'Michael Jordan',
        date: '1996-12-25',
        opponent: 'New York Knicks',
        points: 45,
        rebounds: 5,
        assists: 7
    }
    let newgame2 = {
        player: 'Michael Jordan',
        date: '1996-12-26',
        opponent: 'New York Knicks',
        points: 50,
        rebounds: 10,
        assists: 10
    }
    await dao.create(newgame1);
    await dao.create(newgame2);

    let games = await dao.readAll();

    expect(games.length).toEqual(2);
    expect(games[0].player).toEqual(newgame1.player);
    expect(games[0].date).toEqual(newgame1.date);
    expect(games[0].opponent).toEqual(newgame1.opponent);
    expect(games[0].points).toEqual(newgame1.points);
    expect(games[0].rebounds).toEqual(newgame1.rebounds);
    expect(games[0].assists).toEqual(newgame1.assists);

    expect(games[1].player).toEqual(newgame2.player);
    expect(games[1].date).toEqual(newgame2.date);
    expect(games[1].opponent).toEqual(newgame2.opponent);
    expect(games[1].points).toEqual(newgame2.points);
    expect(games[1].rebounds).toEqual(newgame2.rebounds);
    expect(games[1].assists).toEqual(newgame2.assists);
});

test('update a game', async function(){
    let newgame = {
        player: 'Michael Jordan',
        date: '1996-12-25',
        opponent: 'New York Knicks',
        points: 45,
        rebounds: 5,
        assists: 7
    }
    let created = await dao.create(newgame);
    created.points = 50;
    created.rebounds = 10;
    let updated = await dao.update(created);
    let found = await dao.read(created._id);

    expect(updated._id).toEqual(created._id);
    expect(found.points).toEqual(50);
    expect(found.rebounds).toEqual(10);
}
);
test('update a non-existing game', async function(){
    let newgame = {
        _id: '000000000000000000000000',
        player: 'Michael Jordan',
        date: '1996-12-25',
        opponent: 'New York Knicks',
        points: 45,
        rebounds: 5,
        assists: 7
    }
    let updated = await dao.update(newgame);
    expect(updated).toBeNull();
}
);      
