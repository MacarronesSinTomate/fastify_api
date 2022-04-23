const { login, signin } = require('./controllers/login');

const fastify = require('fastify')({
    logger: true
})

const routes = async (fastify, options) => {

    fastify.decorate("jwtVerify", async (request, reply) => {

        try {

            await request.jwtVerify();

        } catch (err) {

            reply.send(err);

        }

    })

    // CHECK CONNECTION
    fastify.get( '/', { onRequest: fastify.jwtVerify }, ( req, res ) => { res.code( 200 ).send( { error: false } ) } );

    // AUTH
    fastify.post( '/login',  login );
    fastify.post( '/signin', signin );

}

module.exports = routes