

// Router file

import {React,Route,Switch,HomePage,Welcome,Forgotpassword,Activate,Reactivate,Resetpassword} from '../views/Header'

function Router() {
    return (
        <div>
            <Switch>
                <Route exact path="/register" component={HomePage}></Route>
                <Route exact path="/" component={HomePage}></Route> 
                <Route exact path="/welcome" component={Welcome}></Route>
                <Route exact path="/forgot" component={Forgotpassword}></Route>
                <Route exact path="/activate" component={Activate}></Route>
                <Route exact path="/reactivate" component={Reactivate}></Route>
                <Route exact path="/change-password/:id/:token" component={Resetpassword}></Route>
            </Switch>
        </div>
    )
}

export default Router
