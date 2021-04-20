
/************* User register validation *************************/

const validator = require('validator');

const registeration=require('../models/registerSchema');

const validation =(req,res,next)=>{
    try{

         //initialize empty to errors object
            const errors={};

        //get all input value and perform validation
         const {uname,contact,email_id,serial_key,password,cpassword}=req.body.register_details;

    
        // validation for name
        errors.name_error=validate_username(uname);

        // validation for contact
        errors.phone_error=req.body.intlTelInput_error;

        // validation for email
        errors.email_error=validate_email(email_id);

        // validation for serialkey
        errors.serial_key_error=validate_serialkey(serial_key);

        //validation for password
        errors.pass_error=validate_password(password);

        errors.cpass_error=validate_confirm_password(cpassword,password);

        if(checkallvalidation(errors))
        {
            
            // check contact-number and email-id already exist
            registeration.findOne({email_id})
            .then((emailExist)=>{
                    if(emailExist)
                    {
                        errors.email_error="already exist";
                        res.json({errors});
                    }
                    else
                    {
                        registeration.findOne({contact})
                        .then((contactExist)=>{
                                if(contactExist)
                                {
                                    errors.phone_error="already exist";
                                    res.json({errors});
                                }
                                else
                                {
                                    // perform next operation which is in registeration[controller]
                                    next();
                                }
                        })

                    }
            })

        }
        else
        {
            res.json({errors});
        }

    }catch(err){
        res.send(`got error in register_validation[exports.validation] : ${err}`);
    }

   

}


// check all validations 
const checkallvalidation=(props)=>{
    let {name_error,phone_error,email_error,serial_key_error,pass_error,cpass_error}=props;

    return (validator.isEmpty(name_error) && validator.isEmpty(phone_error) && validator.isEmpty(email_error)
    && validator.isEmpty(serial_key_error) && validator.isEmpty(pass_error) && validator.isEmpty(cpass_error)
    )? true : false;

}

//validation for full name
const validate_username = (props) =>{

    //check full name is empty string ?
    if(validator.isEmpty(props))
    {
        return "required";
    }

    // check full name  sholud be atleast 3 characters in length
    else if(props.length<3)
    {
        return "The full name field must be at least 3 characters in length";
    }

    // check full name  sholud not exceed 50 characters in length
    else if(props.length>50)
    {
        return "The full name field cannot exceed 50 characters in length";
    }

    // check full name should not contain more than one white space consecutively
    else if(props.match(/([\s]{2})/))
    {
        return "The full name field should not contain more than one white space consecutively";
    }

    // check full name should not contain more than one white space consecutively
    else if(props.match(/([.]{2})/))
    {
        return "The full name field should not contain more than one dot consecutively";
    }
    // check full name should not contain more than two letters consecutively
    else if(props.match(/([a-z])\1{2,}/i))
    {
        return "The full name field should not contain more than two repeated alphabetic letters consecutively";
    }
   
    // check full name only contain alphabetic letters and spaces
    else if(!(props.match(/^[[a-z\s.]+$/i)))
    {
        return "The full name field  only contain  alphabetical letters and dot";
    }

    else
    {
        return "";
    }

}


//validation for Email
const  validate_email = (props) =>{

    //check email Id is empty string ?
    if(validator.isEmpty(props))
    {
        return "required";
    }
    else if(!(validator.isEmail(props)))
    {
        return "Please enter valid email id";
    }
    else
    {
        return "";
    }
    

} 


//validation for serial key
const validate_serialkey= (props) =>{
    
    //check Serial key is empty string ?
    if(validator.isEmpty(props))
    {
        return "required";
    }
    else
    {
        return "";
    }

}


//validation for Password
const validate_password = (props) =>{
    
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

module.exports=validation;