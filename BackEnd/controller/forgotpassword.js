/**********************forgot password controller ************************/

require('dotenv').config();

const {Router}=require('express');

const router=Router();

const session = require('express-session');

const transporter=require('../config/email');

const moment = require('moment');


const validation=require('../validation/forgot_validation');

// get data for forgopassword
router.post('/forgot',validation,(req,res)=>{
    try{
         //get data
        const {email_id}=req.body;

        //mail body
        let mailOptions={
        from:process.env.from,
        to:email_id,
        subject:process.env.forgot_subject,
        html:
        `<h4>Forgot  your password ?</h4>
        <div>
                <p>That's okay it happens! click below  link to reset your password </p>
                <p><a href='${process.env.base_url}/resetpassword'>click here</a><p>
                <p>Kind Regards, <strong> Prosoft e-Solutions India Pvt Ltd.</strong></p>

        </div> `
        };

    
        // send activation link to user[email-id]
            transporter.sendMail(mailOptions)
            .then(()=>{
                res.json({success:`A link to reset your password has been sent to  ${email_id} click that link within 1 hour`});
            }).catch((err)=>{
                res.send(`Sorry!!!! unable to load your request try again later`);
            });

    }
    catch(err)
    {
        console.log(`got error in route[/forgot] : ${err}`);
    }


    // router.use(session({
    //     secret:'session secret key',
    //     resave:false,
    //     saveUninitialized: true,
    //     cookie:{
    //         'name':'password-link',
    //         httpOnly:false,
    //         secure:false,
    //         maxAge
    //     }
    // }));
    // console.log(moment(new Date()).format("DD-MM-YYYY h:mm:ss a"));
    
   

});


module.exports=router;