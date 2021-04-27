/**********************register schema ************************/


const mongoose=require('mongoose');
const moment = require('moment');


const registerSchema=new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    serial_key:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    activation_code:{
        type:String,
        required:true
    },
    created_date:{
        type:String,
        default:() => moment().format("DD-MM-YYYY h:mm:ss a")
    },
    status:{
        type:Number,
        default:0
    }
});

exports.registeration=mongoose.model('user_registeration',registerSchema); //user_registeration->be the name of collection

