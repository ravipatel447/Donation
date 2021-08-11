const express = require('express');
const User = require('../model/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/dusers',async (req,res)=>{
    const password = req.body.password;
    const cpassword = req.body.conformpassword;
    if(password===cpassword){
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });
        try{
            await user.save();
            const token = await user.generateAuthToken();
            res.cookie("jwt",token);
            res.render('index',{
                encodedJson : encodeURIComponent("Your account has been created")
            });
        }
        catch(e){
            res.status(400).send(e);
        }
    }
    else{
        res.status(404).send("your password are different")
    }
})
router.post('/dusers/login',async (req,res)=>{
    const data = (req.body);
    console.log(data);
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.cookie("jwt",token);
        res.render('index',{
            encodedJson : encodeURIComponent("Yor are Successfully loged in!")
        });
    }
    catch(e){
        res.status(400).send(e);
    }
})
router.post('/dusers/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send("now you are loged out");
    }
    catch(e){
        res.status(500).send(e);
    }
})
router.post('/dusers/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send("now you are loged out from all devices");
    }
    catch(e){
        res.status(500).send(e);
    }
})
router.get('/dusers/me',auth,async(req,res)=>{
    res.status(200).send(req.user);
})

router.patch('/dusers/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowapdates = ['name','age','email','password'];
    const invalidop = updates.every((update)=> allowapdates.includes(update));
    if(!invalidop){
        res.status(404).send({error:"invalid Updats!"});
    }
    try{
        updates.forEach((update)=> req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.delete('/dusers/me',auth,async (req,res)=>{
    try{
        await req.user.remove();
        res.send(req.user);
    }
    catch(e){
        res.status(404).send(e);
    }
})

module.exports = router