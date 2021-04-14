
/************** Register controller *******************/

const {Router}=require('express');

const router=Router();

const btoa = require('btoa');

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
                if(err)
                {
                        res.status(500).json({mes:"Sorry !!! internal server error"});
                }
                else
                {
                        res.json({mes:"horay!!!!! you are successfully registered"});
                }
       });
});

module.exports = router;