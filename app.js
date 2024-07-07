const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


require("dotenv").config();

// top level express applicatin
const app = express();


// Database connection
const { dbConnection } = require("./config/database");
dbConnection();


// middlewares 
app.use( express.json() );

app.use( cookieParser() );

app.use( cors( { origin: process.env.FRONTEND_BASE_URL, credentials : true } ) );


// APIs Routes
const { auth , isCustomer  } = require("./middlewares/auth");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/cart", auth, isCustomer, cartRoute);
app.use("/api/v1/products", productRoute);


// listen on the port
app.listen( process.env.PORT , ()=>{
    console.log("The server is running on the port : ", process.env.PORT);
});