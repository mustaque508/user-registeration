 /************************************ Complaints *************************************** */

import {React,NewComplaint,ComplaintView} from '../Header'

 const Complaints = (props) => {
    return (
        <>
                {/* New Complaint */}
                <div className="col-lg-5 mt-2">
                    <NewComplaint serial_key={props.serial_key}/>
                </div>

                {/* view Complaints */}
                <div className="col-lg-7  mt-2">
                    <ComplaintView serial_key={props.serial_key} />
                </div>
        </>
    )
}

export default Complaints;