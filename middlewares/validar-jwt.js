const jwt = require("jsonwebtoken");


const validarJWT = ( req, res, next ) =>{

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            ok:false,
            msg: "El token es obligatorio"
        })
    }


    try {


        const {id} = jwt.verify( token, process.env.JWT_KEY );
        req.uid = id;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"Token no valido"
        })
    }
}


module.exports = {
    validarJWT
}