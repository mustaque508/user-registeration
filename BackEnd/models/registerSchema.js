
/**********************register schema ************************/


const mongoose=require('mongoose');
const moment = require('moment');

const registerSchema=new mongoose.Schema({
    full_name :{
        type:String,
        required:true
    },
    contact :{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    serial_key :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    activation_code :{
        type:String,
        required:true
    },
    created_date:{
        type:String,
        default:() => moment().format("DD-MM-YYYY h:mm:ss a")
    }

});

//create collection
const user_registeration=new mongoose.model("user_registeration",registerSchema);

//create document
const createDocument= async () =>{
    try{

        const newUser=new user_registeration({
            full_name :"Mustaque Jamakhandi",
            contact:"+919113647737",
            email_id:"mustaquemj1111@gmail.com",
            serial_key:"123456",
            password:"TXVzdGFxbWpAMQ==",
            activation_code:"bXVzdGFxdWVtajExMTFAZ21haWwuY29t"

        });
        const result=await newUser.save();
        console.log(result);
    }catch(error){
        console.log(error);
    }
}

// createDocument();

// const User=mangoose.model('User',registerSchema);

// model.exports = User;