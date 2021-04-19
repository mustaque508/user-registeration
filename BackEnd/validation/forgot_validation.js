/**************** forgot password validation ***************/

const validator = require('validator');

const registeration=require('../models/registerSchema');

exports.validateEmail=(req,res,next)=>{

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


//validate password
exports.validate_password = (req,res,next) =>{

    try
    {
        //get data
        const {password,cpassword}=req.body.password_details;

        //initialize empty to errors object
         const errors={};

        //validation for password
        errors.pass_error=validatePassword(password);

        errors.cpass_error=validate_confirm_password(cpassword,password);

        (validator.isEmpty(errors.pass_error) && validator.isEmpty(errors.cpass_error)) ? next() : res.json({errors});
    
    }
    catch(err)
    {
        console.log(`got error in password validation : ${err}`);
    }
  

}




//validation for Password
const validatePassword = (props) =>{
    
    //check password is empty string ?
    if(validator.isEmpty(props))
    {
        return "required";
    }

    //password length should be minimum 8 characters.
    else if(props.length<8)
    {
        return "Length should be minimum 8 characters";
    }

    //check password contain atleast one numeric character 
    else if(!props.match(/[0-9]+/))
    {
        return "The password must include atleast one numeric character";
    }

    //check password contain atleast one alphabetic letter
    else if(!props.match(/[a-z]+/))
    {
      return "The password must include atleast one Alphabetic letter";
    }

    // check password contain atleast one capital letter
    else if(!props.match(/[A-Z]+/))
    {
      return "The password must include atleast one capital letter";
    }

    // check password contain atleast one special character
    else if(!props.match(/[\W]+/))
    {
      return "The password must include atleast one special character";
    }

    // check password should not contain any white space
    else if(props.match(/[\s]/))
    {
        return "The password should not contain white space";
    }
    else
    {
        return "";
    }


}


//validation for confirm_password
const validate_confirm_password = (password,cpassword) =>{

    //check confirm-password is empty string ?
    if(validator.isEmpty(password))
    {
        return "required";
    }
    else if(password !== cpassword)
    {

      return "mismatch password";
    }
    else
    {
      return "";
    }


}
