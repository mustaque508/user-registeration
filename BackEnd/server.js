
/***************************project run from this file****************/
const express = require('express');
const path = require('path');
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());


app.use(express.static(path.join(__dirname,'..','frontEnd','build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontEnd','build','index.html'));
});
app.use(require('./controller/registeration'));

app.listen(PORT,()=>{
    console.log(`successfully server running on ${PORT}`);
});