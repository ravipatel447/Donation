const mongoose = require('mongoose');
const validator = require('validator');

const blood_donation = new mongoose.Schema({
        name:{
        type: String,
        required: true, 
        },
        pincode:{
            type: Number,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error ('Enter valid Email');
                }
            }
        },
        address:{
            type: String,
            required: true,
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
});

blood_donation.pre('save',async function(next){
    const task = this;
    next();
})

const Task = mongoose.model('Blood_Donation',blood_donation) ;

module.exports = Task;