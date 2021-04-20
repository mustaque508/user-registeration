/**********************forgot password controller ************************/

require('dotenv').config();

const {Router}=require('express');

const validator=require('validator');

const router=Router();

const btoa = require('btoa');

const session = require('express-session');

const transporter=require('../config/email');

const moment = require('moment');

const registeration=require('../models/registerSchema');


const Mymodule=require('../validation/forgot_validation');

const jwt=require('jsonwebtoken');


// get data for forgopassword
router.post('/forgot',Mymodule.validateEmail,(req,res)=>{

    //get data
    const {email_id}=req.body;

    let activaton_code=btoa(email_id);


    try{

        //create one time link valid for 15 minutes 
        const JWT_SECRET=process.env.JWT_SECRET;
        
        const secret=JWT_SECRET+activaton_code;

        const payload={
            email:email_id
        }

        const token=jwt.sign(payload,secret,{expiresIn:'15m'});
       

        //mail body
        let mailOptions={
        from:process.env.from,
        to:email_id,
        subject:process.env.forgot_subject,
        html:
        `<h4>Forgot  your password ?</h4>
        <div>
                <p>That's okay it happens! click below  link to reset your password </p>
                <p><a href='${process.env.base_url}/reset/${activaton_code}/${token}'>click here</a><p>
                <p>Kind Regards, <strong> Prosoft e-Solutions India Pvt Ltd.</strong></p>

        </div> `
        };

    
        // send activation link to user[email-id]
            transporter.sendMail(mailOptions)
            .then(()=>{

                res.json({success:`A link to reset your password has been sent to  ${email_id} click that link within 15 minutes`});
            }).catch((err)=>{
                res.send(`Sorry!!!! unable to load your request try again later`);
            });

    }
    catch(err)
    {
        res.send(`got error in route[/forgot] : ${err}`);
    }
});


//expiry  resetpassword link
router.get('/reset/:id/:token',(req,res)=>{

    const {id,token}=req.params;
    const secret=process.env.JWT_SECRET+id;
    try{
        const payload=jwt.verify(token,secret);
        res.redirect(`/change-password/${id}/${token}`);

    }catch(err){
        res.send(`<h1>Sorry!!!! Link is expired..</h1>`);
    }
});


// reset password
router.post('/resetpassword',Mymodule.validate_password,(req,res)=>{
    try
    {
        //get data
        const {activation_code}=req.body;
        const {password} =req.body.password_details;

        if(!validator.isEmpty(activation_code))
        {
            //update password in database
            registeration.updateOne({activation_code},{$set :{password:btoa(password)}})
            .then((updated)=>{
                    (updated.nModified === 1) ? res.json({success:'Your password is updated successfully'}) :res.send('Nothing has changed in password.');
    
                    
            }).catch((err)=>{
                    res.send(`Sorry!!!! unable to load your request..... please contact admin :${err}`);
            });
        }
        
    }
    catch(err)
    {
        res.send(`got error in route[/resetpassword] : ${err}`); 
    }
});

module.exports=router;