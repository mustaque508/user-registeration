/**************************** Complaint Controller **************************************/

const {Router}=require('express');

const router=Router();

const validations=require('../validation');

const validator = require('validator');


// myModules is middelware [pass input data to comlaint_model to store input data]
const myModules=require('../models/complaint_model');



const validation = (req,res,next) =>{
       const {complaint}=req.body;

       const errors={};

       errors.complaint_error=validations.validate_complaint(complaint);

       (validator.isEmpty(errors.complaint_error)) ? next() : res.json({errors});

}

//store complaint
router.post('/storecomplaint',validation,myModules.storeData,(req,res)=>{
       res.json({success:`Your complaint is recorded, we will solve your issue very soon..`});
});


module.exports = router;