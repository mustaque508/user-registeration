/**************************Forgot Model**************************************/
const RegisterSchema=require('../Schemas/RegisterSchema');
const validator = require('validator');
const btoa = require('btoa');
exports.updateData = (req,res,next) =>{
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
                    (updated.nModified === 1) ? next() :res.send('Nothing has changed in password.');
    
                    
            }).catch((err)=>{
                    res.send(`Sorry!!!! unable to load your request..... please contact admin :${err}`);
            });
        }
        
    }
    catch(err)
    {
        res.send(`got error in route[/resetpassword] : ${err}`); 
    }
}