/*************************registeration model**********************************************************/

const RegisterSchema =require('../Schemas/RegisterSchema')
const btoa = require('btoa');
const validator=require('validator');



// store userdata into database
exports.storeData=(req,res,next)=>{
    try{
        const{uname,contact,email_id,serial_key,password}=req.body.register_details;
        let activation_code=btoa(email_id);
    
    
      
        const newRegister=new RegisterSchema.registeration({
            full_name:uname,
            contact:contact,
            email_id:email_id,
            serial_key:serial_key,
            password:btoa(password),
            activation_code:activation_code
        });


        newRegister.save((err)=>{
            if(!err)
                {
                    next();
                }
             else
                {
                    res.send(`Sorry !!! internal server error : ${err}`);
                }
            });   
           
    }catch(err){
        res.send(`got error in model[exports.storeData] : ${err}`);
    }

  
}

// fetch activation code from database and check both user[activationcode] and database[activationcode] same or not
exports.checkActivationcode = (req,res,next)=>{
    try{
        const activation_code=req.query.id;

        if(!(validator.isEmpty(activation_code)))
        {
            RegisterSchema.registeration.findOne({activation_code})
            .then((exist)=>{
                (exist) ? next() : res.send(`unable to load your request wrong activation code`);

            }).catch((err)=>{
                res.send(`Sorry!!!! unable to load your request..... please contact admin`);
                console.log(`something went wrong when validating activation code : $(err)`);
            });
        }
        else
        {
            res.send(`Sorry!!!! unable to load your request..... activation code is empty`);
        }

    }catch(err){
        res.send(`got error in model[exports.checkActivationcode] : ${err}`);
    }
        
}


//activate user account by changing status value to 1
exports.changeStatus = (req,res,next) =>{
    try{

        const activation_code=req.query.id;

        RegisterSchema.registeration.updateOne({activation_code},{$set :{status:'1'}})
        .then((updated)=>{
        
                (updated.nModified === 1) ? next() : res.redirect('/reactivate');

                
        }).catch((err)=>{
                res.send(`Sorry!!!! unable to load your request..... please contact admin :${err}`);
        });

    }catch(err){
        res.send(`got error in model[exports.changeStatus] : ${err}`);
    }
    
}


//get _id and username based on [serial_key]
exports.getID = async (props) =>{
    try{
        const result= await RegisterSchema.registeration.findOne({serial_key:props});
        if(result)
        {
            return result;
        }
    }catch(err){
      console.log(`got error in model[exports.getID] : ${err}`);
    }
}


