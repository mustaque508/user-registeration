
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
        try{
            const {email_id,uname}=req.body.register_details;
            let activation_code=btoa(email_id);

             //mail body
            let mailOptions={
            from:process.env.from,
            to:email_id,
            subject:process.env.reg_subject,
            // html:{
            //       path:'../BackEnd/views/email.html',
            //       context:{
            //             id:activation_code
            //       }
            // }
            html:
            `<h4>Hii, ${uname}</h4>
            <div>
                  <p>Thanks for getting started with our customer portal</p>
                  <p>We need a little more information to complete your registration, including a confirmation of your email address.</p>
                  <p>Click below to confirm your email address:</p>
                  <p><a href='${process.env.base_url}/confirm?id=${activation_code}'>click here</a><p>
                  <p>Kind Regards, <strong> Prosoft e-Solutions India Pvt Ltd.</strong></p>

            </div> `
             }

              // send activation link to user[email-id]
          transporter.sendMail(mailOptions)
          .then(()=>{
                res.json({success:`Account created successfully please visit your  email to activate your account`});
          }).catch((err)=>{
                console.log(err);
                res.send(`Account Created successfully... Sorry!! unable to send activation link please contact admin`);
          });

        }catch(err){
              res.send(`got error in route[/storeData] : ${err}`);
        }
        

        
       
         
     
});


// confirm Email
router.get('/confirm',myModules.checkActivationcode,myModules.changeStatus,(req,res)=>{
      res.redirect('/activate');
});

module.exports = router;