
/***************************project run from this file****************/
const express = require('express');
const path = require('path');
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());


// used for proxy url
app.use(express.static(path.join(__dirname,'..','frontEnd','build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontEnd','build','index.html'));
});

// reqired registeration[controller] to perform registeration operation
app.use(require('./controller/registeration'));


// running node server 
app.listen(PORT,()=>{
    console.log(`successfully server running on ${PORT}`);
});