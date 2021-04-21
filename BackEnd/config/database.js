
/***************************database connection*********************/
const mongoose=require('mongoose');

require('../models/registerSchema');

mongoose.connect("mongodb://localhost:27017/prosoft_testdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    
}).then(()=>{
    console.log(`connected successfully`);
}).catch((error)=>{
    console.log(`not connected : ${error}`);
});