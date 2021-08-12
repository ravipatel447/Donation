const express = require('express');
const Cloth_Donation = require('../model/cloth');
const Blood_Donation = require('../model/blood');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/Cloth_Donation',auth,async(req,res)=>{
    const namer = req.body.fname+" "+req.body.lname;
    const cloth_donation = new Cloth_Donation({
        name: namer,
        pincode: req.body.pincode,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        owner: req.user._id
    });
    try{
        await cloth_donation.save();
        res.render('index',{
            encodedJsons : encodeURIComponent("your are cloth doanation is completed")
        });
    }
    catch(e){
        res.status(400).send(e);
    }
})
router.get('/Cloth_Donation/:id',auth,async(req,res)=>{
    try{
        const cloth_donation = await Cloth_Donation.findOne({_id: req.params.id, owner: req.user._id});
        if(!cloth_donation){
            res.status(400).send("either id is wrong or you are not owner of this task");
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }
})
router.patch('/Cloth_Donation/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowapdates = ['name','pincode','email','address'];
    const invalidop = updates.every((update)=> allowapdates.includes(update));

    if(!invalidop){
        res.status(404).send({error:"invalid Updats!"});
    }

    try{
        const cloth_donation = await Cloth_Donation.findOne({_id:req.params.id,owner:req.user._id})
        if(!cloth_donation){
            return res.status(404).send();
        }
        updates.forEach((update)=>cloth_donation[update] = req.body[update]);
        await cloth_donation.save();
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
        res.send(cloth_donation);
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.delete('/Cloth_Donation/:id',auth,async (req,res)=>{
    try{
        const cloth_donation = await Cloth_Donation.findOneAndDelete({_id:req.params.id,owner:req.user._id });
        if(!cloth_donation){
            res.status(404).send();
        }
        res.send(cloth_donation);
    }
    catch(e){
        res.status(404).send(e);
    }
})
router.post('/Blood_Donation',auth,async(req,res)=>{
    const namer = req.body.fname+" "+req.body.lname;
    const blood_donation = new Blood_Donation({
        name: namer,
        pincode: req.body.pincode,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        owner: req.user._id
    });
    try{
        await blood_donation.save();
        res.render('index',{
            encodedJson : encodeURIComponent("your are blood doanation is completed")
        });
    }
    catch(e){
        res.status(400).send(e);
    }
})
router.get('/Blood_Donation/:id',auth,async(req,res)=>{
    try{
        const blood_donation = await Blood_Donation.findOne({_id: req.params.id, owner: req.user._id});
        if(!blood_donation){
            res.status(400).send("either id is wrong or you are not owner of this task");
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }
})
router.patch('/Blood_Donation/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowapdates = ['name','pincode','email','address'];
    const invalidop = updates.every((update)=> allowapdates.includes(update));

    if(!invalidop){
        res.status(404).send({error:"invalid Updats!"});
    }

    try{
        const blood_donation = await Blood_Donation.findOne({_id:req.params.id,owner:req.user._id})
        if(!blood_donation){
            return res.status(404).send();
        }
        updates.forEach((update)=>blood_donation[update] = req.body[update]);
        await blood_donation.save();
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
        res.send(blood_donation);
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.delete('/Blood_Donation/:id',auth,async (req,res)=>{
    try{
        const blood_donation = await Blood_Donation.findOneAndDelete({_id:req.params.id,owner:req.user._id });
        if(!blood_donation){
            res.status(404).send();
        }
        res.send(blood_donation);
    }
    catch(e){
        res.status(404).send(e);
    }
})

module.exports = router;