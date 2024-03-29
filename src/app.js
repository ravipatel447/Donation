const path = require('path');
const express = require('express');
require('./db/mongoose');
const routerUser = require('./router/user');
const routerDonations = require('./router/donation');
const cookieparser = require('cookie-parser');
const auth_login = require('./middleware/auth-login');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT

app.use(express.static(path.join(__dirname,'../public')));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(routerUser);
app.use(routerDonations);

app.set('view engine','hbs')
app.get('/index',auth_login,(req,res)=>{
    res.render('index',{
        email : encodeURIComponent(req.user.email)
    });
})
app.get('/login_form',(req,res)=>{
    res.render('login_form',{
        title:'donation with charity',
        donate:'3500 rupess'
    });
})
app.get('/Signup_form',(req,res)=>{
    res.render('Signup_form',{
        title:'donation with charity',
        donate:'3500 rupess'
    });
})
app.get('*',auth_login,(req,res)=>{
    res.render('index',{
        email : encodeURIComponent(req.user.email)
    });
})

app.listen(port,()=>{
    console.log(`server is up on port ${port}.`);
});