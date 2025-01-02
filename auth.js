const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const user = require('./models/user');


passport.use(new local_strategy(async(Username,Password,done) =>
{
    try{
        console.log("Received credentials");
        const User = await user.findOne({username : Username });
        if(!User)
        {
            return done(null,false,{ message : "User Not found"});
        }
        const pass_match = await User.compare_password(Password);

        // await bohot danger hai bey


        console.log(pass_match)
        if(pass_match)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false,{message : "Incorrect Password"});
        }
    }catch(err){
        return done(err);
    }
}))


module.exports = passport;
