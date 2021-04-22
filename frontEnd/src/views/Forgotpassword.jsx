/******************************Forgot Password ***************************/


import {TextField,BootstrapTooltip,MuiThemeProvider,Button,colortheme,useState,axios,toast} from './Header'

const Forgotpassword = () =>{

      // get input fields
    const [forgot_details, setForgot_details]=useState({
        'email_id':''
    });

    // change input fields based on [onchange ]
      const inputEvent = (event) =>{
        const{name,value}=event.target;
        setForgot_details((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
    }

     // error_fields
     const[errors,setErrors]=useState({
        'email_error':''
    });

    // show tooltip 
     const [open, setOpen] = useState(false);


     //Hide Tooltip
     const hideToolTip =() =>{
        setOpen(false);
    }

    //submit
    const submit =(event)=>{
        event.preventDefault();
        
        //send Data
        axios.post('/forgot',forgot_details)
        .then((res)=>{

            if(res.data.errors)
            {
                const {email_error}=res.data.errors;
                setErrors({
                    email_error
                });
                setOpen(true);
            }
            else
            {
                setForgot_details({
                    'email_id':'',
                });
                event.target.reset();
                setOpen(false);
                (res.data.success) ?  toast.success(res.data.success): toast.error(res.data);
            }
           
        }).catch((err)=>{
            console.log(`got error when passing input value to /forgot : ${err}`);
        });
    }


    return (
        <>
           <div className="container mt-5">
               <div className="row d-flex justify-content-center">
                   <div className="col-sm-5">
                        <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title text-center">Forgot Password</h5>
                                
                                 {/* card content */}
                                    <form method="POST" onSubmit={submit} className="form-group mt-3" id="submit" autoComplete="off">
                                        {/* Email Address */}
                                            <label htmlFor="email_id" className="mb-0 mt-2" >Email Address</label>
                                            <BootstrapTooltip title={errors.email_error} placement="right-end" open={open} >
                                                <TextField className="form-control mt-0"  type="email" name="email_id" id="email_id" onChange={inputEvent}  onKeyUp={hideToolTip} />
                                            </BootstrapTooltip>

                                        {/*Submit button */}
                                        <MuiThemeProvider theme={colortheme}>
                                            <Button className="mt-3" type="submit" variant="contained" color="primary">submit</Button>
                                        </MuiThemeProvider>
                                    </form>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
        </>
    )
}


export default Forgotpassword;