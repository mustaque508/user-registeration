
/****************************************WELCOME **************************************************** */

import {React,SideBar,WelcomeBar,Comaplaints,useLocation,Videos} from '../Header'


const Welcome = (props) => {
    
      const location =useLocation();
    return (
        <div className="container-fluid">
            <div className="row">

                {/* sidebar */}
                <div className="col-xl-2 col-md-3 col-sm-12">
                    <SideBar/>
                </div>

                <div className="col-xl col-md col-sm">

                    {/* WelcomeBar */}
                    <div className="row">
                        <div className="col-sm-12 p-0">
                            <WelcomeBar username={props.username}/>
                        </div>
                    </div>

                    <div className="row" style={{'marginTop':'5rem'}}> 
                    {
                        (location.pathname === "/welcome")
                        ? <Comaplaints serial_key={props.serial_key} /> : 
                        (location.pathname === "/complaints") ? <Comaplaints serial_key={props.serial_key} />
                        :<Videos/>
                    }   
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
