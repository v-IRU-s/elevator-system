const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user_sch = new mongoose.Schema(
{
    username : {
        required : true,
        type : String,
        unique : true
    },
    password : {
        required : true,
        type : String
    },
    current_floor : {
        type : Number,
        enum : [1,2,3,4,5,6],
        default : 1
    },

    u_towards : {
        type : Number,
        enum : [-1,0,1],
        default : 0
    },

    go_to : {
        type : Number,
        enum : [1,2,3,4,5,6],
        default : 1
    },

    q_no : {
        type : Number,
        default : 0
    }
}
);

user_sch.pre('save', async function(next){
    const useR = this;

    if(!useR.isModified('password')) return next;
    //hash password only if new/modified
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(useR.password,salt);

        useR.password = hashed_password;
        next();
    }catch(err){
        return next(err);
    }
})


user_sch.methods.compare_password = async function(user_password){
    try{
        const is_match = await bcrypt.compare(user_password,this.password);
        console.log(is_match);
        return is_match;
    }catch(err){
        throw err;
    }
}


// IMPORTANT => bcrypt compare
// 1234(password) along with salt--> hashed(scsadcadc)
//while comparing
// scsadcadc --> extract salt
// while authenticating add salt to password and compare hash

const user = mongoose.model('user',user_sch, 'user');
module.exports = user;