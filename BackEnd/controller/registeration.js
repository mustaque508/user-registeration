
/************** Register controller *******************/

require('dotenv').config();

const {Router}=require('express');

const router=Router();

const btoa = require('btoa');

const transporter=require('../config/email');

const registeration=require('../models/registerSchema');

// validation is middelware [pass input data to reg_validatiion for validation]
const validation=require('../validation/reg_validation');


//store data into database
router.post('/storeData',validation,(req,res)=>{
        
        const{uname,contact,email_id,serial_key,password}=req.body.register_details;


       const newRegister=new registeration({
               full_name:uname,
               contact:contact,
               email_id:email_id,
               serial_key:serial_key,
               password:btoa(password),
               activation_code:btoa(email_id)
       });
        
       newRegister.save((err)=>{
                if(!err)
                {
                        // send activation link to user[email-id]
                        let mailOptions={
                             from:process.env.from,
                             to:email_id,
                             subject:process.env.subject,
                             html:"<b>horay!!!! it's working</b>"
                        };

                        transporter.sendMail(mailOptions)
                        .then(()=>{
                                console.log(`horray!!! email sent successfully..`);
                                res.send("testing");
                        }).catch((err)=>{
                                console.log(`something went wrong email not sent : ${err}`);
                        });
                }
                else
                {
                        res.json({mes:"Sorry !!! internal server error"});
                }
       });
});

module.exports = router;