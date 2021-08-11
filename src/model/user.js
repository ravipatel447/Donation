const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userschema = new mongoose.Schema({
    email: {
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
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error ('Password can not contain Password')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }
    ]
});

userschema.methods.toJSON = function(){
    const user = this;
    const userobj = user.toObject();
    delete userobj.password;
    delete userobj.tokens;
    return userobj;
}

userschema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()},process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save(); 

    return token;
}

userschema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error ('Email dosent exist');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error ('Password is wrong!')
    }
    return user;
}

userschema.pre('save',async function (next){
    const user = this;
    if(user.isModified('password')){
        user.password = await  bcrypt.hash(user.password,8);
    }

    next();
});

userschema.pre('remove',async function(next){
    const user = this;
    Task.deleteMany({owner:user._id});
    next();
})
const User = mongoose.model('User',userschema); 

module.exports = User;