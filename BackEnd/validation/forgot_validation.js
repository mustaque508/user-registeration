/**************** forgot password validation ***************/

const validator = require('validator');

const registeration=require('../models/registerSchema');

const validate=(req,res,next)=>{

    try{
       
              //get email-id
              const {email_id}=req.body;
    
              const errors={};
      
              errors.email_error=validate_email(email_id);
      
              // perform database operations
              if(validator.isEmpty(errors.email_error))
              {
                  //check Email-id is registered or not ?
                  registeration.findOne({email_id})
                  .then((exist)=>{
                      if(exist)
                      {
                            //check accout is activated or not
                            registeration.findOne({email_id,status:1})
                            .then((exist)=>{
                                if(exist)
                                {
                                    next();
                                }
                                else
                                {
                                    errors.email_error="please activate your account";
                                    res.json({errors});
                                }

                            }).catch((err)=>{
                                console.log(`got error when checking accout is activated  in forgotpassword validation : ${err}`);
                            });
                      }
                      else
                      {
                        errors.email_error="email-id is not registered";
                        res.json({errors});
                      }
      
                  }).catch((err)=>{
                     console.log(`got error when performing database operation in forgotpassword validation : ${err}`);
                  });
              }
              else
              {
                  res.json({errors});
              }
          
       
    }catch(err){
        console.log(`got error in forgotpassword validation : ${err}`);
    }

}


//validate email_id 
const validate_email =(props) =>{
    return (validator.isEmpty(props)) ? "required" : (!validator.isEmail(props)) ? "Please enter valid email id" :"";
}



module.exports=validate;