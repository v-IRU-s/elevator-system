const express = require('express')
const router = express.Router();
const lift = require('./../models/lift');
const {jwt_auth_middleware,generate_token} = require('./../jwt')




router.post('/',async(req,res) => {
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

router.put('/:id',async(req,res) => {
    try{
        const lift_id = req.params.id;
        const updated_lift = req.body;

        const response = await lift.findByIdAndUpdate(lift_id,updated_lift,{
        new: true,
        runValidators : true,
        })

        if(!response)
        {
            res.status(404).json({error : "Lift Not found"});
        }

        console.log("updated");
        res.status(200).json({message : "Done"});

    }catch(err){
         console.log(err);
         res.status(500).json({error : 'Error'});
    }
})



router.get('/',async(req,res) => {
    try{
        const data = await lift.findOne();
        console.log("fetched");
        res.status(200).json({id : data.id, front : data.front, rear : data.rear, current_floor : data.current_floor});
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})



module.exports = router;