

import {React,Sidebar,NewComplaint} from '../Header'



const Complaints = (props) => {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    
                      
                   

                    {/* sidebar */}
                    <div className="sidebar col-xl-2 col-md-3 col-sm-12 border border-primary">
                        <Sidebar/>
                    </div>

                    
                    <div className="col-xl col-md col-sm">
                        <div className="row">

                            {/* welcome bar */}
                            <div className="col-12 p-0">
                                <nav className="nav-bar sticky-top shadow-sm p-2 mb-3">
                                    <span className="u-name">Welcome Back, <b>{props.username}</b></span>
                                </nav>
                            </div>

                             
                            <div className="col-sm-12">
                                  <div className="row">

                                      {/* New Complaint */}
                                      <div className="col-sm-6">
                                          <NewComplaint serial_key={props.serial_key}/>
                                      </div>

                                      {/* view Complaints */}
                                      <div className="col-sm-6">
                                          <p>testing</p>
                                      </div>

                                  </div>
                            </div>

                        </div>
                    </div>

                   

                </div>
            </div>
        </>

      
    )
}

export default Complaints;

