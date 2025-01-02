const express = require('express')
const router = express.Router();
const user = require('./../models/user');
const {jwt_auth_middleware,generate_token} = require('./../jwt')



router.post('/login',async(req,res) => {
    try{
        const {username,password} = req.body;
        const User = await user.findOne({username : username});
        console.log(User)
        if(!User || !(await User.compare_password(password))){
            return res.status(401).json({error : "Invalid Username or password"});
        }

        const payload = {
                    id : User.id,
                    name : User.username
                }
        console.log(JSON.stringify(payload));
        const token = generate_token(payload);

        console.log('saved');
        res.status(200).json(token);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})


router.post('/signup',async(req,res) => {
    try{
        const data = req.body;
        const newUser = new user(data);
        const response = await newUser.save();
        /*
        const payload = {
            id : response.id,
            name : response.username
        }
        console.log(JSON.stringify(payload));
        const token = generate_token(payload);
        */
        console.log('saved');
        res.status(200).json({message : 'Done'});
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})



router.get('/', jwt_auth_middleware, async(req,res) => {
    try{
        const data = req.user;
        console.log(data)
        const user_id = data.user_data.id;
        console.log(user_id)
        const User = await user.findById(user_id);

        console.log("fetched");
        res.status(200).json({User});
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})


router.get('/:towards',async(req,res) => {
    try{
        const towards = req.params.towards;
        if(towards == 1 || towards == 0 || towards == -1)
        {
            const data = await user.find({u_towards : towards});
            console.log("fetched");
            res.status(200).json(data);
        }
        else { res.status(404).json({error : "Invalid towards type"}); }
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})


router.put('/:id',jwt_auth_middleware, async(req,res) => {
    try{
        const user_id = req.params.id;
        const updated_user = req.body;

        const response = await user.findByIdAndUpdate(user_id,updated_user,{
        new: true,
        runValidators : true,
        })

        if(!response)
        {
            res.status(404).json({error : "User Not found"});
        }

        console.log(response);
        console.log("updated");
        res.status(200).json(response);

    }catch(err){
         console.log(err);
         res.status(500).json({error : 'Error'});
    }
})

router.put('/towards',jwt_auth_middleware,async(req,res) => {
    try{
        const user_data = req.user;
        const user_id = user_data.id;
        const updated_user = req.body;

        const response = await user.findByIdAndUpdate(user_id,updated_user,{
        new: true,
        runValidators : true,
        })
        if(!response)
        {
            res.status(404).json({error : "User Not found"});
        }

        console.log("updated");
        res.status(200).json(response);
    }catch(e){
        console.log(err);
        res.status(500).json({error : 'Error'});
    }
})


router.delete('/:id', async(req,res) => {
    try{
        const user_id = req.params.id;
        const response = await user.findByIdAndDelete(user_id);

        if(!response)
        {
            res.status(404).json({error : "User Not found"});
        }

        console.log("deleted");
        res.status(200).json({ message : 'Deleted'});

    }catch(err){
         console.log(err);
         res.status(500).json({error : 'Error'});
    }
})


module.exports = router;