
/****************************************WELCOME **************************************************** */

import {React,SideBar,WelcomeBar,NewComplaint} from '../Header'


const Welcome = (props) => {

    return (
        <div className="container-fluid">
            <div className="row">

                {/* sidebar */}
                <div className="col-xl-2 col-md-3 col-sm-12 border border-primary">
                    <SideBar/>
                </div>

                <div className="col-xl-10 col-md-9 col-sm">

                    {/* WelcomeBar */}
                    <div className="row">
                        <div className="col-sm-12 p-0">
                            <WelcomeBar username={props.username}/>
                        </div>
                    </div>

                    <div className="row">

                        {/* New Complaint */}
                        <div className="col-sm-6">
                            <NewComplaint serial_key={props.serial_key}/>
                        </div>

                        {/* view Complaints */}
                        <div className="col sm-6">
                            <p>testing</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
