/************* Reactivate view *********************/
import {MuiThemeProvider,colortheme,Button,Link} from  '../Header'

const Reactivate =()=>{

   
    return (
        <>
           <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h3>Your account is already activated</h3>
                            <p>click below button to login</p>

                            <MuiThemeProvider theme={colortheme}>
                            <Button  type="button" variant="contained" color="primary"><Link to='/' className="text-white text-decoration-none">click here</Link></Button>
                            </MuiThemeProvider>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Reactivate;