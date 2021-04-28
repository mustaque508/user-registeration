
/***************************project run from this file****************/

require('./config/database');
const express = require('express');
const path = require('path');  
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());



// required registeration[controller] to perform registeration operation
app.use(require('./controller/registeration'));

// required login[controller] to perform login operation
app.use(require('./controller/login'));

// required forgotpassword[controller] to perform forgotpassword operation
app.use(require('./controller/forgotpassword'));

// required complaints[controller] to perform complaint operation
app.use(require('./controller/complaint'));

// used for proxy url
app.use(express.static(path.join(__dirname,'..','frontEnd','build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontEnd','build','index.html'))
});




// running node server 
app.listen(PORT,()=>{
    console.log(`successfully server running on ${PORT}`);
});