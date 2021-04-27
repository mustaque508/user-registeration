

import { React,colortheme,MuiThemeProvider,TextField,Checkbox,FormControlLabel,Button,Link,
    BootstrapTooltip,useState,axios,useHistory,useEffect,Cookies,atob,toast} from '../Header'

// login Component
const LoginForm = () => {

    const history=useHistory();

    // get input fields
    const[login_details,setLogin_details]=useState({
        'email_id':'',
        'password':'',
        'remember_me':false
    });

    // error_fields
    const[errors,setErrors]=useState({
        'email_error':'',
        'pass_error':''
    });

    // Destructing of objects
    const{email_error,pass_error}=errors;
    const{email_id,password,remember_me}=login_details;
    
    // show tooltip 
      const [open, setOpen] = useState(false);


    //Hide Tooltip
    const hideToolTip =() =>{
        setOpen(false);
    }

     //set cookie value 
     useEffect(() => {

        const email_id=((Cookies.get("email_cookie")))? atob(Cookies.get("email_cookie")):"";
        const password=((Cookies.get("password_cookie")))? atob(Cookies.get("password_cookie")):"";
        const remember_me = (Cookies.get("rememberme_cookie") === "true");
         setLogin_details({
             email_id,password,remember_me
         });

    },[]);
    

    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        const value =event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setLogin_details({
            ...login_details,
            [event.target.name]: value
        });
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
                    const {full_name,serial_key}=res.data;

                    //set sessionStorage
                    sessionStorage.setItem('uname',full_name);
                    sessionStorage.setItem('serial_key',serial_key);

                
                    history.push({
                        pathname:'/welcome',
                        state:{
                            username:sessionStorage.getItem('uname')
                        }
                    });
                }
                else
                {
                    toast.error(res.data,{autoClose: false});
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
                            <TextField className="form-control mt-0"  type="email" name="email_id" id="email_id" onChange={inputEvent} onKeyUp={hideToolTip} value={email_id} />
                        </BootstrapTooltip>

                         {/* Password */}
                         <label htmlFor="password" className="mb-0 mt-2" >Password</label>
                        <BootstrapTooltip title={pass_error} placement="right-end" open={open} >
                            <TextField className="form-control mt-0"  type="password" name="password" id="password" onChange={inputEvent} onKeyUp={hideToolTip} value ={password}/>
                        </BootstrapTooltip>
                        
                        {/* checkbox */}
                        <div className="row ml-0">
                            <div className="remember_me col p-0">
                            <MuiThemeProvider theme={colortheme}>
                                <FormControlLabel control={<Checkbox color="primary" id="remember_me" name="remember_me" checked={login_details.remember_me} onChange={inputEvent} value={remember_me} /> } label="Remember Me"/>
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



