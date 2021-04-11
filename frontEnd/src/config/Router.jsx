

// Router file

import {React,Route,Switch,HomePage} from '../views/Header'

function Router() {
    return (
        <div>
            <Switch>
                <Route exact path="/register" component={HomePage}></Route>
                <Route exact path="/" component={HomePage}></Route> 
            </Switch>
        </div>
    )
}

export default Router
