

/*******************user register form*****************/

import {React,colortheme,MuiThemeProvider,useState,useEffect,TextField,
    Button,InfoSharpIcon,Popover,OverlayTrigger,plugin_for_contact,BootstrapTooltip,axios,toast} 
    from '../Header'



const RegisterForm = () => {

// get input fields
const [register_details, setregister_details] = useState({
    'uname':'',
    'contact':'',
    'email_id':'',
    'serial_key':'',
    'password':'',
    'cpassword':''

});

// error_fields
const[errors,setErrors]=useState({
    'name_error':'',
    'phone_error':'',
    'serial_key_error':'',
    'email_error':'',
    'pass_error':'',
    'cpass_error':''
});

// // Destructing of objects
const {name_error,phone_error,serial_key_error,email_error,pass_error,cpass_error}=errors;



// show tooltip 
const [open, setOpen] = useState(false);



// popover for password rules
const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h1">The password must include</Popover.Title>
      <Popover.Content>
            <ul className="list-unstyled">
                <li>length should be minimum 8 characters.</li>
                <li>atleast one numeric character.</li>
                <li>atleast one Alphabetic letter.</li>
                <li>atleast one capital letter.</li>
                <li>one special character.</li>
                <li>should not contain white space.</li>
            </ul>
      </Popover.Content>
    </Popover>
  );

// display country_code based on country in phone input_field 
useEffect(() => {
plugin_for_contact(document.querySelector("#contact"));
},[]);


//validate contact_number based on countrycode
const validate_contact = () =>
{
    return plugin_for_contact(document.querySelector("#contact"));

}

// change input fields based on [onchange ]
const inputEvent = (event) =>{
    const{name,value}=event.target;
    setregister_details((prevValue)=>{
        return{
            ...prevValue,
            [name]:value
        }

    })
}

//Hide Tooltip
const hideToolTip =() =>{
    setOpen(false);
}

//submit form 
const submit =  (event) =>{

    event.preventDefault();
    const intlTelInput_error=validate_contact();

    //send data
    axios.post('/storeData',{register_details,intlTelInput_error})
    .then((res)=>{
         
         if(res.data.errors)
         {
             const {name_error,phone_error,email_error,serial_key_error,pass_error,cpass_error}=res.data.errors;
             setErrors({
                name_error,phone_error,email_error,serial_key_error,pass_error,cpass_error
             });
             setOpen(true);
         }
         else
         {
            if(res.data.success)
            {
                setregister_details({
                    'uname':'',
                    'phone':'',
                    'email_id':'',
                    'serial_key':'',
                    'password':'',
                    'cpassword':''
                });
                event.target.reset();
                setOpen(false);
                toast.success(res.data.success);
            }
            else
            {
                toast.error(res.data,{autoClose: false});
            }
           
         }
        
    }).catch((err)=>{
        console.log(`got error when passing input fields to /storeData : ${err}`);
    });
                  
  
}





return (
    <div>
         <div className="card border-0">
            <div className="card-body">
                <h2 className="card-title text-capitalize text-center">sign up</h2>
                <form onSubmit={submit} method="POST" className="form-group mt-3" id="submit" autoComplete="off">
                   
                    {/* Full Name */}
                    <label htmlFor="uname" className="mb-0">Full Name</label>
                    <BootstrapTooltip title={name_error} placement="right-end" open={open}>
                        <TextField className="form-control mt-0" type="text" name="uname" id="uname" onChange={inputEvent} onKeyUp={hideToolTip}/>
                    </BootstrapTooltip>
                    
                    
                    {/* Contact */}
                    <label htmlFor="phone" className="mb-0 mt-2">Contact</label>
                    <BootstrapTooltip title={phone_error} placement="right-end" open={open}>
                        <TextField className="form-control mt-0"  type="text" name="contact" id="contact" onChange={inputEvent} onKeyUp={hideToolTip} />
                    </BootstrapTooltip>
                    
                    {/* Email Address */}
                    <label htmlFor="email_id" className="mb-0 mt-2" >Email Address</label>
                    <BootstrapTooltip title={email_error} placement="right-end" open={open}>
                        <TextField className="form-control mt-0"  type="email" name="email_id" id="email_id" onChange={inputEvent} onKeyUp={hideToolTip} />
                    </BootstrapTooltip>

                    {/* Serial Key */}
                    <label htmlFor="serial_key" className="mb-0 mt-2">Serial Key</label>
                    <BootstrapTooltip title={serial_key_error} placement="right-end" open={open}>
                        <TextField className="form-control mt-0"   type="text" name="serial_key" id="serial_key" onChange={inputEvent} onKeyUp={hideToolTip} />
                    </BootstrapTooltip>
                    
                    {/* Password */}
                    <label htmlFor="password" className="mb-0 mt-2" >Password</label>
                    <BootstrapTooltip title={pass_error} placement="right-end" open={open}>
                        <TextField className="form-control mt-0"  type="password" name="password" id="password" onChange={inputEvent} onKeyUp={hideToolTip}  />
                    </BootstrapTooltip>

                    {/* Confirm Password */}
                    <label htmlFor="cpassword" className="mb-0 mt-2">Confirm Password</label>
                    <BootstrapTooltip title={cpass_error} placement="right-end" open={open}>
                        <TextField className="form-control mt-0" type="password" name="cpassword" id="cpassword" onChange={inputEvent} onKeyUp={hideToolTip}  />
                    </BootstrapTooltip>
                    
                   

                     {/* display password rules */}
                     <OverlayTrigger trigger={['hover','focus']}  placement="left" overlay={popover}>
                    <InfoSharpIcon  className="position-absolute text-primary" style={{'right':'1.5rem','cursor':'pointer','marginTop':'-4rem'}} id="info"/>
                    </OverlayTrigger>
    
                    {/* submit button */}
                    <MuiThemeProvider theme={colortheme}>
                        <Button  type="submit" variant="contained" color="primary" className="mt-4">submit</Button>  
                    </MuiThemeProvider>
                   
                </form>
            </div>
        </div>
    </div>
  
)
}

export default RegisterForm;


