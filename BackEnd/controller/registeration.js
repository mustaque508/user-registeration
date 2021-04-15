
/************** Register controller *******************/

/* Note:
1.myModules.checkActivationcode->middleware to validate activation code
2.myModules.storeData->middelware for storing user data
*/


require('dotenv').config();

const {Router}=require('express');

const router=Router();

const path = require('path');

const transporter=require('../config/email');

const btoa = require('btoa');



// validation is middelware [pass input data to reg_validatiion for validation]
const validation=require('../validation/reg_validation');

const myModules=require('../models/reg_model');






//store data into database
router.post('/storeData',validation,myModules.storeData,(req,res)=>{
        
          const {email_id}=req.body.register_details;
          let activation_code=btoa(email_id);

         //mail body
          let mailOptions={
                  from:process.env.from,
                  to:email_id,
                  subject:process.env.subject,
                  html:`<p>Thanks for registering.. <a href='${process.env.base_url}/confirm?id=${activation_code}'>click here </a>  to activate your account.</p>`
          }
       
          // send activation link to user[email-id]
          transporter.sendMail(mailOptions)
          .then(()=>{
                res.json({success:`Account created successfully please visit your registered email to activate your account`});
          }).catch((err)=>{
                console.log(err);
                res.send(`Account Created successfully... Sorry!! unable to send activation link please contact admin`);
          });
     
});


// confirm Email
router.get('/confirm',myModules.checkActivationcode,myModules.changeStatus,(req,res)=>{
      res.sendFile('activation.html', { root:'./views'});
});

module.exports = router;