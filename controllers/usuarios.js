const { response } = require("express")
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) =>{

    const desde = Number( req.query.desde ) || 0;
    const usuarios = await Usuario
    .find({ _id: {$ne : req.uid } })
    .sort('-online')
    .skip(desde)
    .limit(15);
    

    res.send({
        ok:true,
        msg:"ok",
        usuarios,
        desde
    })
}

module.exports = {
    getUsuarios
}