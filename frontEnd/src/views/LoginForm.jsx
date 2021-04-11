import { React,colortheme,MuiThemeProvider,TextField,Checkbox,FormControlLabel,Button,Link,login_input} from './Header'

// login Component
const LoginForm = () => {
    return (
        <div>
            <div className="card border-0" style={{'marginTop':'5rem'}}>
                <div className="card-body">

                     {/* card title */}
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <h2 className="card-title text-capitalize" style={{'marginBottom':'-0.5rem'}}>sign in</h2>
                        </div>
                    </div>
                    
                    {/* card content */}
                    <form action=""  className="form-group">
                         {/* input fields */}
                         {login_input.map((data,index)=>{ return (<TextField key={index}  className="form-control mt-4" type={data.type} label={data.label} name={data.name} id={data.id} />)})}
                        
                        {/* checkbox */}
                        <div className="row ml-0">
                            <div className="remember_me col p-0">
                            <MuiThemeProvider theme={colortheme}>
                                <FormControlLabel className="mt-4" control={<Checkbox color="primary"/> } label="Remember Me"/>
                            </MuiThemeProvider>
                            </div>
                            <div className="forgot_pass col p-0 ">
                                <a href="" className="float-right mr-3" style={{'marginTop':'2rem'}}>Forgot Password ?</a>
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






{/* <div className="row  mt-3 d-flex flex-column">
                            <div className="email col">
                                <TextField type="text"  label="Email Address"  className="form-control "/>
                            </div>
                            <div className="email col">
                                <TextField type="password"  label="Password"  className="form-control mt-4 "/>
                            </div>
                        </div> */}
