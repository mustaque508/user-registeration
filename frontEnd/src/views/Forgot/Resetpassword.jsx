/******* Reset Password ************************/


import {InfoSharpIcon,BootstrapTooltip,TextField,OverlayTrigger,MuiThemeProvider,Button,
    colortheme,Popover,useState,axios,toast,useHistory} from '../Header';


const Resetpassword = (props)=>{

const history=useHistory();


// get input fields
const [password_details, setPassword_details] = useState({
'password':'',
'cpassword':''
});



// change input fields based on [onchange ]
const inputEvent = (event) =>{
const{name,value}=event.target;
setPassword_details((prevValue)=>{
    return{
        ...prevValue,
        [name]:value
    }

})
}

// error_fields
const[errors,setErrors]=useState({
'pass_error':'',
'cpass_error':''
});

// show tooltip 
const [open, setOpen] = useState(false);


// Hide Tooltip
const hideToolTip =() =>{
  setOpen(false);
}

// Destructing of objects
const {pass_error,cpass_error}=errors;

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

//submit data
const submit = (event) =>{
event.preventDefault();

    //send Data
    axios.post('/resetpassword',{password_details,activation_code:props.match.params.id})
    .then((res)=>{
    
        if(res.data.errors)
        {
            const{cpass_error,pass_error}=res.data.errors;
            setErrors({
              cpass_error,pass_error
            });
            setOpen(true);
        }
        else
        {

          if(res.data.success)
          {
            //reset input-fields
            setPassword_details({
              'password':'',
              'cpassword':''
            });

            //reset form
            event.target.reset();
            setOpen(false);

            toast.success(res.data.success);

            history.push('/');
          }
          else
          {
             toast(res.data,{autoClose:false});
             history.push('/');
          }
        }

    }).catch((err)=>{
        console.log(`got error when passing input value to /resetpassword : ${err}`);
    })

}


return (
<div>
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-5">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h2 className="card-title text-capitalize text-center">reset password</h2>
                        <form onSubmit={submit} method="POST" className="form-group mt-3" id="submit" autoComplete="off">
                          
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
                          <InfoSharpIcon  className="position-absolute text-primary" style={{'right':'2.5rem','cursor':'pointer','marginTop':'-4rem'}} id="info"/>
                          </OverlayTrigger>
          
                          {/* submit button */}
                          <MuiThemeProvider theme={colortheme}>
                              <Button  type="submit" variant="contained" color="primary" className="mt-4">submit</Button>  
                          </MuiThemeProvider>
                      </form>
                </div>
            </div>
        </div>
      </div>
    </div>
     
</div>

)

}


export default Resetpassword;