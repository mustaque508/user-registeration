
/************** Register controller *******************/

const {Router}=require('express');
 const axios = require('axios');
const router=Router();

const validator = require('validator');

const validation=require('../validation/reg_validation');


router.post('/storeData',validation,(req,res)=>{

        res.send("testing sent");
});

module.exports = router;