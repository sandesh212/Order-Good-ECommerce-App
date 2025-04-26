const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();

const DB = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`Connected to MongoDb Databse ${conn.connection.host}`.bgGreen.white);
    } catch (err) {
        console.log(`Cannot connect to database ${err}`.bgRed.white);
    }
};

module.exports = connectDB;
