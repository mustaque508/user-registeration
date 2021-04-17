/**********************Validation for Login *****************************/

const validator = require('validator');

const registeration=require('../models/registerSchema');

//convert string to base_64 code
const btoa=require('btoa');


const validate = (req,res,next)=>{
    try{

        //get data
        const {email_id,password}=req.body;

        const errors={};

        errors.email_error=validate_email(email_id);

        errors.pass_error=validate_password(password);

        if(validator.isEmpty(errors.email_error) && validator.isEmpty(errors.pass_error))
        {
                //check Email id is exist or not in database
                registeration.findOne({email_id})
                .then((Exist)=>{
                    if(Exist)
                    {
                        //check email-id is activated or not 
                        registeration.findOne({email_id,status:1})
                        .then((Exist)=>{
                            if(Exist)
                            {
                                //check Password is same or not 
                                registeration.findOne({email_id,password:btoa(password)})
                                .then((Exist)=>{
                                    if(Exist)
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
                        errors.email_error="email-id not registered";
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
        console.log(`got error in login validations : ${err}`);
    }
   
}


//validate email_id
const validate_email = (props) =>{

    return (validator.isEmpty(props)) ? "required" : (!validator.isEmail(props)) ? "Please enter valid email id" :"";
}


//validate password
const validate_password = (props)=>{

    return (validator.isEmpty(props)) ? "required" : "";
}

module.exports=validate;