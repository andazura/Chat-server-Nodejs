
const Mensaje = require("../models/mensajes");

const getMensajes = async (req, res) =>{

    const miUid = req.uid;
    const mensajesDe = req.params.id;
    const last30 = await Mensaje.find({
        $or: [
            {de: miUid, para: mensajesDe},
            {de:mensajesDe, para: miUid}
        ]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes:last30
    })

}


module.exports = {
    getMensajes
}