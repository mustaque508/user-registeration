

// Router file

import {React,Route,Switch,HomePage,Welcome} from '../views/Header'

function Router() {
    return (
        <div>
            <Switch>
                <Route exact path="/register" component={HomePage}></Route>
                <Route exact path="/" component={HomePage}></Route> 
                <Route exact path="/welcome" component={Welcome}></Route>
            </Switch>
        </div>
    )
}

export default Router
