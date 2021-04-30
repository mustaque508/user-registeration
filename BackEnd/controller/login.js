// /****************************user Login Controller **************************************/

require('dotenv').config();
const {Router}=require('express');
const router=Router();
const btoa = require('btoa');
const validations=require('../validation');
const RegisterSchema=require('../Schemas/RegisterSchema');
const validator = require('validator');
const log_model=require('../models/log_model');
const axios = require('axios');

//cookie expiry for 1 day
const REMEMBERME_COOKIE_EXPIRY=new Date(Date.now()+86400000);




//set cookie
const setCookie = (req,res,next) =>{
 
    //get data
    const {remember_me,email_id,password}=req.body;
    

    if(remember_me)
    {
        //set cookie
        res.cookie('email_cookie',btoa(email_id),{expires:REMEMBERME_COOKIE_EXPIRY});
        res.cookie('password_cookie',btoa(password),{expires:REMEMBERME_COOKIE_EXPIRY});
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


//input validation
const validation = (req,res,next)=>{
    try{

        //get data
        const {email_id,password}=req.body;

        const errors={};

        errors.email_error=validations.validate_email(email_id);

        errors.pass_error=validations.validate_pass(password);

        if(validator.isEmpty(errors.email_error) && validator.isEmpty(errors.pass_error))
        {
                //check Email id is exist or not in database
                RegisterSchema.registeration.findOne({email_id})
                .then((exist)=>{
                    if(exist)
                    {
                        //check email-id is activated or not 
                        RegisterSchema.registeration.findOne({email_id,status:1})
                        .then((exist)=>{
                            if(exist)
                            {
                                //check Password is same or not 
                                RegisterSchema.registeration.findOne({email_id,password:btoa(password)})
                                .then((exist)=>{
                                    if(exist)
                                    {
                                        next();
                                    }
                                    else
                                    {
                                        errors.pass_error="Incorrect password";
                                        res.json({errors});
                                    }
                                }).catch((err)=>{
                                    console.log(`got Error when checking password : ${err}`);
                                });
                            }
                            else
                            {
                                errors.email_error="please activate your account ";
                                res.json({errors}); 
                            }

                        }).catch((err)=>{
                            console.log(`got Error when checking status : ${err}`);
                        });
                    }
                    else
                    {
                        errors.email_error="email-id is not registered";
                        res.json({errors});
                    }

                }).catch((err)=>{
                    console.log(`got error when checking Email Id is exist or not in database : ${err} `);
                })
        }
        else
        {
            res.json({errors});
        }

        

    }catch(err){
        res.send(`got error in login validations : ${err}`);
    }
   
   
}


//login
router.post('/login',validation,setCookie,log_model.getData,(req,res)=>{
       
        const {full_name,serial_key}=res.locals;
        res.json({full_name,serial_key});
});







module.exports = router;