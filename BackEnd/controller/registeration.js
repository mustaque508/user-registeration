
/************** Register controller *******************/

require('dotenv').config();

const {Router}=require('express');

const validator  = require('validator');

const router=Router();

const btoa = require('btoa');

const transporter=require('../config/email');

const registeration=require('../models/registerSchema');

// validation is middelware [pass input data to reg_validatiion for validation]
const validation=require('../validation/reg_validation');



//store data into database
router.post('/storeData',validation,(req,res)=>{
        
        const{uname,contact,email_id,serial_key,password}=req.body.register_details;
        let activation_code=btoa(email_id);
        

       const newRegister=new registeration({
               full_name:uname,
               contact:contact,
               email_id:email_id,
               serial_key:serial_key,
               password:btoa(password),
               activation_code:activation_code
       });
        
       newRegister.save((err)=>{
                if(!err)
                {
                        // send activation link to user[email-id]
                        let mailOptions={
                             from:process.env.from,
                             to:email_id,
                             subject:process.env.subject,
                             html:`<p>Thanks for registering.. <a href='${process.env.base_url}/confirm?activation_code=${activation_code}'>click here </a>  to activate your account.</p>`
                        };

                        transporter.sendMail(mailOptions)
                        .then(()=>{
                                console.log(`horray!!! email sent successfully..`);
                                res.send(`Account Created successfully please visit your email to activate your account....`);
                        }).catch((err)=>{
                                console.log(`something went wrong email not sent : ${err}`);
                                res.send(`Account Created successfully... Sorry!! unable to send activation link please contact admin`);
                        });
                }
                else
                {
                        res.json({mes:"Sorry !!! internal server error"});
                }
       });
});


// confirm Email
router.get('/confirm',(req,res)=>{
        const activation_code=req.query.activation_code;

        

        // check activation_code is exist or not 
        if(!validator.isEmpty(activation_code))
        {
                // check url[activation_code] == db[activation_code]
        }
        else
        {
              res.send('Sorry!!!! unable to load your request.....');
               
        }
});

module.exports = router;