const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnection = ()=>{
    mongoose.connect( process.env.MONGODB_URL )
    .then( ()=> console.log("Database is connected successfully!"))
    .catch( (e)=>{
        console.log("Database is not connected");
        console.log( "Error : " ,e );
        process.exit(1);
    })
};