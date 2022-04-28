const fs = require('fs');

exports.getCarpetas = ( req, res ) => {

    const { ruta } = req.query;

    console.log( "REQ: ", req );

    let rutaCompleta = process.env.BASE_DATA_URL;
    if ( ruta ) rutaCompleta += "/" + ruta;

    console.log( "Ruta:" , rutaCompleta );

    const carpetas = fs.readdirSync( rutaCompleta, { withFileTypes: true } );

    console.log( "Carpetas: ", carpetas );

    res.send({ error: false, rutaActual: rutaCompleta, carpetas: carpetas });

}