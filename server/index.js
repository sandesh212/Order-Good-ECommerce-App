const express = require("express");
const app = express();
const morgan = require("morgan")
require("dotenv").config();
const cors = require("cors")
const colors = require("colors");
const connectDB = require("./config/db.js")
const category = require("./routes/category.js")
const path = require("path");

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build"))) ;

//Connection to Databse
connectDB();

//Port Configuration
const port = process.env.PORT || 5000

app.use("/user",require("./routes/user.js"))
app.use("/category",category);
app.use("/product",require("./routes/product.js"));

//rest API
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(port,()=>{
    console.log(`Server is Lisiting on port ${port}`);
})
