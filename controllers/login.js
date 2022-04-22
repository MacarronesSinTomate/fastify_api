
/**
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * 
 * @returns Devuelve el token del usuario
 */
exports.login = async ( req, res ) => {

    try {

        const { username, password } = req.body;

        if ( !username || !password ) return res.code( 500 ).send( { error: true, msg: "Usuario o contraseña incorrectos" } );

        const payload = {
            username,
            password
        }
        const token = await res.jwtSign(payload);

        res.send({ error: false, token });

    } catch ( err ) {

        res
        .code( 500 )
        .send({ 
            error: true,
            msg: "Usuario o contraseña incorrectos"
        })

    }

}