/****************************user Login Controller **************************************/

const {Router}=require('express');

const router=Router();

const registeration=require('../models/registerSchema');

const validatiion=require('../validation/login_validation');

router.post('/login',validatiion,(req,res)=>{
  
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
                console.log(`Got Error when user login : ${err}`);
         });
});
module.exports = router;