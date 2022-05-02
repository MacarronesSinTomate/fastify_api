const fs = require('fs');

exports.getCarpetas = ( req, res ) => {

    try{

        const { ruta } = req.query;

        let rutaCompleta = process.env.BASE_DATA_URL;
        if ( rutaCompleta.charAt( rutaCompleta.length - 1 ) != "/" ) rutaCompleta += "/";
        if ( ruta ) rutaCompleta += "/" + ruta;
    
        console.log( "Ruta:" , rutaCompleta );
    
        const carpetas = fs.readdirSync( rutaCompleta, { withFileTypes: true } );
    
        res.send({ error: false, rutaActual: rutaCompleta, carpetas: carpetas });

    } catch ( err ) {

        res.send({ error: true, msg: "Ruta no encontrada", rutaActual: rutaCompleta, carpetas: [] });

    }

}