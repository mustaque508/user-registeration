/***********Welcome Page **************************/

import {MuiThemeProvider,colortheme,Button,Cookies,useHistory,toast} from './Header'


const Welcome = (props) =>{


    const history=useHistory();

    //logout
    const logout= () =>{

        //clear cookies
        Cookies.remove('email_cookie');
        Cookies.remove('password_cookie');
        Cookies.remove('rememberme_cookie');

        //redirect home
        toast.success(`You have successfully logged out !!`);
        history.push('/');
       

    }

    return (
        <>
            <div>
                <h3>Welcome back,{props.username}</h3>

                 {/* Logout button */}
                 <MuiThemeProvider theme={colortheme}>
                        <Button onClick={logout}  type="Button" variant="contained" color="primary" className="mt-3">logout</Button>  
                 </MuiThemeProvider>
            </div>
        </>
    );
}

export default Welcome;

