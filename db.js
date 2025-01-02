const mongoose = require('mongoose');
require('dotenv').config();


//const mongoURL = process.env.mongoLocal;  // Use IPv4 address
const mongoURL = process.env.mongoGlobal;  // Use IPv4 address

mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;

db.on('connected',() => {
    console.log("Db connected");
});

db.on('error',() => {
    console.log("Error");
});

db.on('disconnected',() => {
    console.log("Db disconnected");
});

module.exports = db;