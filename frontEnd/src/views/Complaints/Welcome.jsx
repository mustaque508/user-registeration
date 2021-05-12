
/****************************************WELCOME **************************************************** */

import {React,SideBar,WelcomeBar,Comaplaints,useLocation,Videos} from '../Header'


const Welcome = (props) => {
    
    const location =useLocation();

     //disableRightClick
     const disableRightClick =(e)=>{

        //  if(location.pathname === "/videos"){
        //     e.preventDefault();
        //  }
    }

    return (
        <div className="container-fluid" onContextMenu={disableRightClick} >
            <div className="row">

                {/* sidebar */}
                <div className="col-md-3 col-xl-2 ">
                    <SideBar/>
                </div>

                <div className="col-md-9 col-xl">

                    {/* WelcomeBar */}
                    <div className="row">
                        <div className="col-12 p-0">
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
