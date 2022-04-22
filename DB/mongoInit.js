const { MongoClient } = require('mongodb');

exports.mongoInit = async () => {

    const client = new MongoClient( process.env.MONGO_URL );

    try {

        await client.connect();

        const db    = client.db( "Test_Videogames_App" );
    
        const users = db.collection('users');
        const games = db.collection('games');

        global.users = users;
        global.games = games;

        console.log( "    ✅ Connected to mongodb: ", process.env.ENV );

    } catch ( err ) {

        console.log( "    ❎ Failed mongo conection: ", process.env.ENV );
        console.log( "    MONGO ERROR: ", err );

    }

}