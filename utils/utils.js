const bcrypt = require('bcrypt');

exports.gen_pass = async ( password ) => {

    const saltRounds = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);
    const generatedPass = await bcrypt.hash( password, genSalt );

    return generatedPass;

}