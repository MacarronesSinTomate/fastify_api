const bcrypt = require('bcrypt');
const { validame } = require("validame");
const { user_schema } = require('../schemas/user_schema');
const { gen_pass } = require('../utils/utils');


/**
 * 
 * Comprueba que el usuario existe y si existe devuelve token
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * 
 * @returns Devuelve el token del usuario
 * 
 */
exports.login = async ( req, res ) => {

    try {

        const { username, password } = req.body;

        // COMPROBAMOS LOS DATOS RECIBIDOS
        if ( !username || !password ) {

            return res.send( { 
                error: true, 
                msg: "Usuario o contraseña incorrectos" 
            });

        }

        // BUSCAMOS AL USUARIO
        const find ={
            username : username
        }
        const usuario = await global.mongo_users.findOne( find );

        if ( !usuario ) {

            return res.send( { 
                error: true, 
                msg: "Usuario o contraseña incorrectos" 
            });

        }

        // COMPROBAMOS LA CONTRASEÑA
        const check_pass = await bcrypt.compare( password, usuario.password );
        if ( !check_pass ) {

            return res.send( { 
                error: true, 
                msg: "Usuario o contraseña incorrectos" 
            });

        }

        // GENERAMOS TOKEN Y LO DEVOLVEMOS
        const payload = {
            username,
            password
        }
        const token = await res.jwtSign(payload);

        res.send({ 
            error: false, 
            token : token,
            usuario: usuario
        });

    } catch ( err ) {

        console.log( "ERR: ", err );

        res.code( 400 ).send({ 
            error: true,
            msg: "Usuario o contraseña incorrectos"
        })

    }

}

/**
 * 
 * Obtiene el usuario y la contraseña y 
 * lo almacena en mongo
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * 
 */
exports.signin = async ( req, res ) => {

    try {

        const { username, password } = req.body;

        // COMRPROBAMOS LOS DATOS RECIBIDOS
        if ( !username || !password ) {

            return res.send( { 
                error: true, 
                msg: "Usuario o contraseña incorrectos" 
            });

        }
        
        // VALIDAMOS LA CONTRASEÑA
        const error = validame( password, {
            allow: "aA 1"
        });
        if ( error ) {

            return res.send({ 
                error: true, 
                msg: error
            });

        }

        // COMRPROBAMOS SI EL USUARIO EXISTE
        const check_user = await global.mongo_users.findOne({ username : username });
        if ( check_user ) {

            return res.code( 400 ).send({ 
                error: true,
                msg: "El usuario ya existe"
            })    

        }

        // GENERAMOS CONTRASEÑA
        const generatedPass = await gen_pass( password );

        // CONFIGURO OBJETO USUARIO
        const nuevo_usuario = { ...user_schema };
        nuevo_usuario.username = username;
        nuevo_usuario.password = generatedPass;

        // INSERTO
        global.mongo_users.insertOne( nuevo_usuario );

        res.send( { 
            error: false, 
            msg: "Usuario creado correctamente" 
        });

    } catch ( err ) {

        console.log( "ERR: ", err );

        res.code( 400 ).send({ 
            error: true,
            msg: "No se ha podido realizar el registro"
        })

    }

}