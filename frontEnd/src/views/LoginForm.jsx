

import { React,colortheme,MuiThemeProvider,TextField,Checkbox,FormControlLabel,Button,Link,BootstrapTooltip,useState,axios,useHistory} from './Header'

// login Component
const LoginForm = () => {

    const history=useHistory();

    // get input fields
    const[login_details,setLogin_detail]=useState({
        'email_id':'',
        'password':''
    });

    // error_fields
    const[errors,setErrors]=useState({
        'email_error':'',
        'pass_error':''
    });

    // Destructing of objects
    const{email_error,pass_error}=errors;
    
    // show tooltip 
      const [open, setOpen] = useState(false);


    //Hide Tooltip
    const hideToolTip =() =>{
        setOpen(false);
    }


    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        const{name,value}=event.target;
        setLogin_detail((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }

        })
    }

    //submit form 
    const submit=(event)=>{
        event.preventDefault();
        
        //send Data
        axios.post('/login',login_details)
        .then((res)=>{
        
            if(res.data.errors)
            {
                const{email_error,pass_error}=res.data.errors;
                setErrors({
                    email_error,pass_error
                });
                setOpen(true);
            }
            else
            {
                if(res.data.full_name)
                {
                    // redirect to /welcome with passing username
                    const {full_name}=res.data;
                    history.push({
                        pathname:'/welcome',
                        state:full_name
                    });
                }
            }

        }).catch((err)=>{
            console.log(`got error when passing input value to /login : ${err}`);
        })

    }



    return (
        <div>
            <div className="card border-0" style={{'marginTop':'5rem'}}>
                <div className="card-body">

                     {/* card title */}
                     <h2 className="card-title text-capitalize text-center">sign in</h2>
                    
                    {/* card content */}
                    <form method="POST" onSubmit={submit} className="form-group mt-3" id="submit" autoComplete="off">

                         {/* Email Address */}
                         <label htmlFor="email_id" className="mb-0 mt-2" >Email Address</label>
                        <BootstrapTooltip title={email_error}  placement="right-end" open={open} >
                            <TextField className="form-control mt-0"  type="email" name="email_id" id="email_id" onChange={inputEvent} onKeyUp={hideToolTip} />
                        </BootstrapTooltip>

                         {/* Password */}
                         <label htmlFor="password" className="mb-0 mt-2" >Password</label>
                        <BootstrapTooltip title={pass_error} placement="right-end" open={open} >
                            <TextField className="form-control mt-0"  type="password" name="password" id="password" onChange={inputEvent} onKeyUp={hideToolTip} />
                        </BootstrapTooltip>
                        
                        {/* checkbox */}
                        <div className="row ml-0">
                            <div className="remember_me col p-0">
                            <MuiThemeProvider theme={colortheme}>
                                <FormControlLabel control={<Checkbox color="primary"/> } label="Remember Me"/>
                            </MuiThemeProvider>
                            </div>
                            <div className="forgot_pass col p-0 ">
                                <Link to="/forgot" className="float-right mr-3" style={{'marginTop':'0.5rem'}}>Forgot Password ?</Link>
                            </div>
                        </div>


                        <div className="row d-flex flex-column">
                            <div className="col">
                            <MuiThemeProvider theme={colortheme}>
                            <Button  type="submit" variant="contained" color="primary">Login</Button>
                            </MuiThemeProvider>
                                
                            </div>
                            <div className="col">
                                <p className="mt-1">Don't have an account ? <Link to='/register'>register</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default LoginForm;



