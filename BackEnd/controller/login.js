/****************************user Login Controller **************************************/

require('dotenv').config();

const {Router}=require('express');

const router=Router();

const registeration=require('../models/registerSchema');

const validatiion=require('../validation/login_validation');

const jwt=require('jsonwebtoken');

const cookieParser = require('cookie-parser');

router.use(cookieParser());

//cookie expiry
const REMEMBERME_COOKIE_EXPIRY=new Date(Date.now()+86400000);




//set cookie
const setCookie = (req,res,next) =>{
 
    //get data
    const {remember_me,email_id,password}=req.body;

    if(remember_me)
    {
        //set cookie
        res.cookie('email_cookie',email_id,{expires:REMEMBERME_COOKIE_EXPIRY});
        res.cookie('password_cookie',password,{expires:REMEMBERME_COOKIE_EXPIRY});
        res.cookie('rememberme_cookie',remember_me,{expires:REMEMBERME_COOKIE_EXPIRY});

        next();
    }
    else
    {
        //delete cookie
        res.clearCookie('email_cookie');
        res.clearCookie('password_cookie');
        res.clearCookie('rememberme_cookie');
        next();
    }
   
}

router.post('/login',validatiion,setCookie,(req,res)=>{

        const {email_id}=req.body;

        //get name based on email-id from database
         registeration.findOne({email_id})
         .then((data)=>{
                 if(data)
                 {
                     const {full_name}=data;
                     res.json({full_name});
                 }

         }).catch((err)=>{
               res.send(`Got Error when user login : ${err}`);
         });
});
module.exports = router;