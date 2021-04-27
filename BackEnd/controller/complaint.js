/**************************** Complaint Controller **************************************/

const {Router}=require('express');

const router=Router();

const validator = require('validator');


// myModules is middelware [pass input data to comlaint_model to store input data]
const myModules=require('../models/complaint_model');

//validate complaint
const validate_complaint = (req,res,next) =>{

    //get data
    const {complaint,serial_key}=req.body;

    const errors={};
    
   if(validator.isEmpty(complaint)){
       errors.complaint_error="required";
       res.json({errors});
   }
   else
   {
       next();
   }


}


//store complaint
router.post('/storeComplaint',validate_complaint,myModules.storeData,(req,res)=>{
       res.json({success:`Your complaint is recorded, we will solve your issue very soon..`});
});


module.exports = router;