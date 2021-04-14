
/*************email configure*********************/

//Note: all email details are stored in .env file like [host,port,user,pass]

require('dotenv').config();
const nodemailer=require('nodemailer');


let transporter=nodemailer.createTransport({
    host:process.env.host,
    port:process.env.port,
    secure:false,
    auth:{
        user:process.env.user,
        pass:process.env.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports=transporter;