/***********************Log Model *********************************/
const RegisterSchema=require('../Schemas/RegisterSchema');
const complaint_model=require('../models/complaint_model');

//get name based on email-id from database
exports.getData =(req,res,next) =>{
    const {email_id}=req.body;
 
    //get name based on email-id from database
    RegisterSchema.registeration.findOne({email_id})
     .then((data)=>{
             if(data)
             { 
                 const {full_name,serial_key}=data;
                 res.locals.full_name=full_name;
                 res.locals.serial_key=serial_key;
                 next();
 
             }
 
     }).catch((err)=>{
           res.send(`Got Error when user login : ${err}`);
     });
 }

