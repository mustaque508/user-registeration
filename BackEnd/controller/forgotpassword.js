// /**********************forgot password controller ************************/

require('dotenv').config();
const transporter=require('../config/email');
const {Router}=require('express');
const validations=require('../validation');
const validator = require('validator');
const RegisterSchema=require('../Schemas/RegisterSchema');
const btoa = require('btoa');
const jwt = require('jsonwebtoken');

// const validator=require('validator');

const router=Router();




// const transporter=require('../config/email');


// const registeration=require('../models/schemas');


// const Mymodule=require('../validation/forgot_validation');

// const jwt=require('jsonwebtoken');


//input validation
const validation = (req,res,next) =>{

    try{
       
        //get email-id
        const {email_id}=req.body;

        const errors={};

        errors.email_error=validations.validate_email(email_id);

        // perform database operations
        if(validator.isEmpty(errors.email_error))
        {
            //check Email-id is registered or not ?
            RegisterSchema.registeration.findOne({email_id})
            .then((exist)=>{
                if(exist)
                {
                      //check account is activated or not
                      RegisterSchema.registeration.findOne({email_id,status:1})
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
            res.send(`got error in forgotpassword validation : ${err}`);
        }
}


//send Email
const sendEmail = (req,res,next) =>{

    //get data
    const {email_id}=req.body;

    let activaton_code=btoa(email_id);

    try{

        //create one time link valid for 15 minutes 
        const JWT_SECRET=process.env.JWT_SECRET;
        
        const secret=JWT_SECRET+activaton_code;

        const payload={
            email:email_id
        }

        const token=jwt.sign(payload,secret,{expiresIn:'15m'});
       

        //mail body
        let mailOptions={
        from:process.env.from,
        to:email_id,
        subject:process.env.forgot_subject,
        html:
        `<h4>Forgot  your password ?</h4>
        <div>
                <p>That's okay it happens! click below  link to reset your password </p>
                <p><a href='${process.env.base_url}/reset/${activaton_code}/${token}'>click here</a><p>
                <p>Kind Regards, <strong> Prosoft e-Solutions India Pvt Ltd.</strong></p>

        </div> `
        };

    
        // send activation link to user[email-id]
            transporter.sendMail(mailOptions)
            .then(()=>{
                    next();
            }).catch((err)=>{
                res.send(`Sorry!!!! unable to load your request try again later`);
            });

    }
    catch(err)
    {
        res.send(`got error in route[/forgot] : ${err}`);
    }
}

// get data for forgopassword
router.post('/forgot',validation,sendEmail,(req,res)=>{
    const{email_id}=req.body;
    res.json({success:`A link to reset your password has been sent to  ${email_id} click that link within 15 minutes`});
});


//expiry  resetpassword link
router.get('/reset/:id/:token',(req,res)=>{

    const {id,token}=req.params;
    const secret=process.env.JWT_SECRET+id;
    try{
        const payload=jwt.verify(token,secret);
        res.redirect(`/change-password/${id}/${token}`);

    }catch(err){
        res.send(`<h1>Sorry!!!! Link is expired..</h1>`);
    }
});


//password validation
const pass_validation = (req,res,next) =>{
    
     const {password,cpassword}=req.body.password_details;

     const errors={};

     //validation
     errors.pass_error=validations.validate_password(password);
     errors.cpass_error=validations.validate_confirm_password(cpassword,password);

     (validator.isEmpty(errors.pass_error) && validator.isEmpty(errors.cpass_error)) ? next() : res.json({errors});
}



// reset password
router.post('/resetpassword',pass_validation,(req,res)=>{
    try
    {
        //get data
        const {activation_code}=req.body;
        const {password} =req.body.password_details;

        if(!validator.isEmpty(activation_code))
        {
            //update password in database
            RegisterSchema.registeration.updateOne({activation_code},{$set :{password:btoa(password)}})
            .then((updated)=>{
                    (updated.nModified === 1) ? res.json({success:'Your password is updated successfully'}) :res.send('Nothing has changed in password.');
    
                    
            }).catch((err)=>{
                    res.send(`Sorry!!!! unable to load your request..... please contact admin :${err}`);
            });
        }
        
    }
    catch(err)
    {
        res.send(`got error in route[/resetpassword] : ${err}`); 
    }
});

module.exports=router;