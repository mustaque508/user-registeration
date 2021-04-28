

// Router file

import {React,Route,Switch,HomePage,Forgotpassword,Reactivate,
        Resetpassword,useLocation,Redirect,useHistory,PageNotFound,Activate,Welcome} from '../views/Header'



const Router = () => {

    const location=useLocation();

    const history=useHistory();

    // get username from useHistory hook
    const username=location.state;
    
    return (
        <div>
            <Switch>

                <Route exact path="/" component={HomePage}></Route> 
                
                <Route exact path="/register">
                    {(history.action === "PUSH") ? <HomePage/> : <Redirect to="/" /> }
                </Route>
                
                <Route exact path="/welcome">
                    {(username) ? <Welcome username={sessionStorage.getItem('uname')} serial_key={sessionStorage.getItem('serial_key')}/> : <Redirect to="/" /> }
                </Route>

                <Route exact path="/complaints">
                    {(sessionStorage.getItem('uname')) ? <Welcome username={sessionStorage.getItem('uname')} serial_key={sessionStorage.getItem('serial_key')}/> : <Redirect to="/" /> }
                </Route>

                <Route exact path="/forgot">
                    {(history.action === "PUSH")? <Forgotpassword/> : <Redirect to="/" /> }
                </Route>
                
                <Route exact path="/activate" component={Activate}></Route> 

                <Route exact path="/reactivate" component={Reactivate}></Route> 

                <Route exact path="/change-password/:id/:token" component={Resetpassword}></Route> 

                <Route component={PageNotFound} />

            </Switch>
        </div>
      
       
    )

    
}

export default Router
