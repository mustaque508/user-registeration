const middleware= (req,res,next)=>{
    console.log(req.body);
    const test="testing";
    if(test)
    {
        res.send("testing");
    }
    else
    {
        next();
    }
   

}

module.exports=middleware;