
/************** Register controller *******************/

/* Note:
1.myModules.checkActivationcode->middleware to validate activation code
2.myModules.storeData->middelware for storing user data
*/


const {Router}=require('express');
const router=Router();
const validations=require('../validation');
const RegisterSchema=require('../Schemas/RegisterSchema');
const axios = require('axios');
require('dotenv').config();
const transporter=require('../config/email');
const btoa = require('btoa');


// myModules is middelware [pass input data to register_model to store input data]
const myModules=require('../models/reg_model');


//input validation
const validation = (req,res,next) =>{

     //get all input value and perform validation
     const {uname,contact,email_id,serial_key,password,cpassword}=req.body.register_details;

     //initialize empty to errors object
     const errors={};

     // validations
     errors.name_error=validations.validate_username(uname);
     errors.phone_error=req.body.intlTelInput_error;
     errors.email_error=validations.validate_email(email_id);
     errors.serial_key_error=validations.validate_serialkey(serial_key);
     errors.pass_error=validations.validate_password(password);
     errors.cpass_error=validations.validate_confirm_password(cpassword,password);

     if(validations.checkallvalidation(errors)){
            
            // check contact-number and email-id already exist
            RegisterSchema.registeration.findOne({email_id})
            .then((emailExist)=>{
                    if(emailExist)
                    {
                        errors.email_error="already exist";
                        res.json({errors});
                    }
                    else
                    {
                        RegisterSchema.registeration.findOne({contact})
                        .then((contactExist)=>{
                                if(contactExist)
                                {
                                    errors.phone_error="already exist";
                                    res.json({errors});
                                }
                                else
                                {
                                   

                                    //Validate Serial key already used
                                    RegisterSchema.registeration.findOne({serial_key})
                                    .then((Exist)=>{
                                        if(Exist)
                                        {
                                            errors.serial_key_error="already used";
                                            res.json({errors});
                                        }
                                        else
                                        {
                                            
                                    
                                            //check whether serial key is invalid ?
                                            axios.post(process.env.API_KEY,null,{params :{
                                                serial_key,
                                                hdd_address:'',
                                                product_id:process.env.product_id  
                                             }})
                                            .then((response)=>{
                                                if(response.data !=="INVALID_SERIAL_KEY")
                                                {
                                                     // perform next operation which is in registeration[controller]
                                                     next();

                                                }
                                                else
                                                {
                                                    errors.serial_key_error="Invalid serial key";
                                                    res.json({errors}); 
                                                }
                                            })
                                            .catch((err)=>{
                                                res.send(`got an error when validating serial key : ${err}`);
                                            });
                                            
                                           
                                        }

                                    })

    

                                 
                                   
                                }
                        }).catch((err)=>{
                            res.send(`got error when checking contact already exist or not  : ${err}`);
                        });
            

                    }
            }).catch((err)=>{
                res.send(`got error when checking email-id already exist or not  : ${err}`);
            });

      }
      else{
            res.json({errors});
      }

}


//send Email
const sendEmail =(req,res,next)=>{
      
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

                  next();

          }).catch((err)=>{
                console.log(err);
                res.send(`Account Created successfully... Sorry!! unable to send activation link please contact admin`);
          });

        }catch(err){
              res.send(`got error in route[/storeData] : ${err}`);
        }
        

}

//store data into database
router.post('/storeData',validation,sendEmail,myModules.storeData,(req,res)=>{
     res.json({success:`Account created successfully please visit your  email to activate your account`});           
});


// confirm Email
router.get('/confirm',myModules.checkActivationcode,myModules.changeStatus,(req,res)=>{
      res.redirect('/activate');
});

module.exports = router;