const { mongoInit } = require('./DB/mongoInit');
const fastify = require('fastify')({})
require('dotenv-flow').config();

// Registramos el router
fastify.register( require('./router.js') );

// Registramos el pluguin JWT
fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET   
})


const start = async () => {

    mongoInit();
        
    try {

        await fastify.listen(3000);

    } catch (err) {

        console.log(err);
        process.exit(1);

    }
}

start()