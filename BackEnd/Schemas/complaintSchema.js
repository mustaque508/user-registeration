/**********************Complaint schema ************************/

const mongoose=require('mongoose');
const moment = require('moment');

const complaintSchema=new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    complaint_no:{
        type:String,
        required:true
    },
    serial_key:{
        type:String,
        required:true
    },
    complaint:{
        type:String,
        required:true
    },
    complaint_date_time:{
        type:String,
        default:() => moment().format("DD-MM-YYYY h:mm:ss a")
    },
    status:{
        type:Number,
        default:0
    }
});


exports.complaint_details=mongoose.model('complaint_details',complaintSchema); //complaints->be the name of collection

