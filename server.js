const express = require('express')
const app = express();
const cors = require('cors');
const passport = require('./auth')
const db = require('./db');
require ('dotenv').config;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req body
const PORT =  3000;



app.use(passport.initialize());
app.use(cors());


const userRoutes = require('./routes/user_rt');
const liftRoutes = require('./routes/lift_rt');

const authenticate = passport.authenticate('local',{session : true});


app.get('/',authenticate,function(req,res){
    res.send("Hello");
    console.log("Kitni baar hello bolu");
})


app.use('/user',userRoutes);
app.use('/lift',liftRoutes);




app.listen(PORT,() =>
{
    console.log("Listening on port");
}
)