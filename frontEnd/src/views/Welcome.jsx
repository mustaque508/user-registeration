/***********Welcome Page **************************/

import {useLocation,MuiThemeProvider,colortheme,Button} from './Header'


const Welcome = () =>{

    const location=useLocation();

    // get username from useHistory hook
    const username=location.state;



    return (
        <>
            <div>
                <h3>Welcome back,{username}</h3>

                 {/* Logout button */}
                 <MuiThemeProvider theme={colortheme}>
                        <Button  type="Button" variant="contained" color="primary" className="mt-3">logout</Button>  
                 </MuiThemeProvider>
            </div>
        </>
    );
}

export default Welcome;

