/************* Reactivate view *********************/
import {MuiThemeProvider,colortheme,Button,Link} from  '../Header'

const Reactivate =()=>{

   
    return (
        <>
         <div class="conainer mt-3 ">
            <div class="row d-flex justify-content-center">
                <div class="col-12 col-sm-8">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded">
                        <div class="card-body">
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