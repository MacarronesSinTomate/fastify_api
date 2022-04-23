const { MongoClient } = require('mongodb');

exports.mongoInit = async () => {

    try {

        const client = new MongoClient( process.env.MONGO_URL );

        await client.connect();

        const database = client.db( "Test_Videogames_App" );
    
        const users = database.collection('users');
        const games = database.collection('games');

        global.mongo_users = users;
        global.mongo_games = games;
        
        console.log( "    ✅ Connected to mongodb: ", process.env.ENV );

    } catch ( err ) {

        console.log( "    ❎ Failed mongo conection: ", process.env.ENV );
        console.log( "    MONGO ERROR: ", err );

    }

}