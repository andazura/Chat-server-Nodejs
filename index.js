
const express = require("express");
const path = require('path');
require('dotenv').config();


//db config
require('./database/config').dbConnection();

// app express
const app = express();

// lecutra y parseo de body
app.use( express.json() );

// node server sockets
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

//path public
const publicPath = path.resolve(__dirname,'public');
app.use( express.static(publicPath));


// Mis rutas
app.use( '/api/login', require('./routes/auth') );



server.listen( process.env.PORT, ( err )=>{
    if( err ) throw new Error(err);
    console.log(`Servidor corriendo en puerto`,process.env.PORT)
})