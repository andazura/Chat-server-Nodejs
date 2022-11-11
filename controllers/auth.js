const { response } = require("express")
const bcrypt = require("bcrypt");

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");



const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const existeEmail = await Usuario.findOne({ email })
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
    const usuario = new Usuario( req.body );

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);

    await usuario.save();

    // Genrera mi JWT
    const token = await generarJWT( usuario.id )
    console.log(token);

    res.json({
        ok:true,
        msg: usuario,
        token
    })
}


const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDb = await Usuario.findOne( { email } );
        if( !usuarioDb ){
            return res.setHeader('status',404).json({
                ok: false,
                msg: "Email no encontrado"
            }) 
        }

        const validPassword = bcrypt.compareSync( password, usuarioDb.password );
        if( !validPassword ){
            return res.setHeader('status',400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            })
        }

        //generarjwt
        const token = await generarJWT( usuarioDb.id )

        res.json({
            ok:true,
            msg: usuarioDb,
            token
        })

    } catch (error) {
        console.log(error)
        res.setHeader('status',500).json({
            ok: false,
            msg: "Hbale con el admin"
        }) 
    }

    
}

const renewtoken = async (req, res= response) =>{


    const { uid } = req;


    const token = await generarJWT( uid );

    const usuario = await Usuario.findById( uid );

    res.json({
        ok:true,
        usuario,
        token
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    renewtoken
}