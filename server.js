const express = require('express')
const app = express();
const db = require('./db');
//require ('dotenv').config;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req body
const PORT =  3000;

const user = require('./models/user');
const lift = require('./models/lift');


app.get('/',function(req,res){
    res.send("Hello");
    console.log("Kitni baar hello bolu");
})



app.post('/user',async(req,res) => {
    try{
        const data = req.body;
        const newUser = new user(data);
        const response = await newUser.save();
        console.log('saved');
        res.status(200).json(response.id);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})




app.get('/user',async(req,res) => {
    try{
        const data = await user.find();
        console.log("fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})


app.post('/lift',async(req,res) => {
    try{
        const data = req.body;
        const newLift = new lift(data);
        const response = await newLift.save();
        console.log('saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})




app.get('/lift',async(req,res) => {
    try{
        const data = await lift.find();
        console.log("fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})


app.listen(PORT,() =>
{
    console.log("Listening on port");
}
)