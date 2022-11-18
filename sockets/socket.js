const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index')

// Mensajes de sockets
io.on('connection', client => {

    console.log("Cliente conectado");
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )

    if( !valido ) { return client.disconnect() }

    usuarioConectado( uid );

    //Ingresar auna sala en partcular
    // sala global
    client.join( uid );

    //Escuahr mensaje personal
    client.on('mensaje-personal', async (payload) =>{
       //todo grabar mensaje
       await grabarMensaje(payload);
        io.to( payload.para ).emit('mensaje-personal',payload);
    });

    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
        usuarioDesconectado( uid );
    });
  });