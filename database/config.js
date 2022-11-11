const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async() =>{

    try {

        console.log(process.env.DB_CNN)
        await mongoose.connect( process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("DB Online")
    } catch (err) {
        console.log(err);
        throw new Error("Erro en la db - Hable con el admin")
    }
} 


module.exports = {
    dbConnection
}