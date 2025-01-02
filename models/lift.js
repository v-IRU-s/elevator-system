const mongoose = require('mongoose');


const lift_sch = new mongoose.Schema(
{
    current_floor : {
        type : Number,
        enum : [1,2,3,4,5,6]
    },

    go_to_up : {
        type : [Number],
        enum : [1,2,3,4,5,6]
    },

    go_to_down : {
        type : [Number],
        enum : [1,2,3,4,5,6]
    },

    l_towards : {
        type : Number,
        enum : [-1,0,1]
    },

    front : {
        type : Number,
        default : 0
    },

    rear : {
        type : Number,
        default : 0
    }
}
);


const lift = mongoose.model('lift',lift_sch, 'lift');
module.exports = lift;