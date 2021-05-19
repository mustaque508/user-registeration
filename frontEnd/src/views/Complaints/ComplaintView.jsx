
/**********************Complaint View ********************************/


import {React,axios,useState,useEffect} from '../Header'
import CachedIcon from '@material-ui/icons/Cached';
import { useCallback } from 'react';
import $ from 'jquery'
import SearchIcon from '@material-ui/icons/Search';




 const ComplaintView = (props) => {

    //complaints
    const [complaints,setComplaints]=useState([]);


    //set serial_key
    const[serial_key]=useState(props.serial_key);

    //search array
    const [searchArray,setSearchArray]=useState([]);


    //get all complaints based on serial_key
    const fetchcomplaints = useCallback(
        () => {
            axios.post('/getcomplaints',{serial_key})
            .then(res=>{
                setComplaints(res.data.complaints);
                setSearchArray(res.data.complaints);
            }).catch((err)=>{
                console.log(`got error when fetching complaints : ${err}`);
            })
        },
        [serial_key],
    )
    
    
    useEffect(()=>{
        fetchcomplaints();
    },[fetchcomplaints]);

    //refresh function
    const refresh_component = () =>{
        setTimeout(() => {
              fetchcomplaints();
            $('#mytbody').fadeOut('fast').fadeIn('fast');
        },0);
    }


    //search function
    const search = (event)=>{
        let newArray=searchArray.filter((searchvalue)=>{
            return( 
                searchvalue.complaint.toLowerCase().indexOf(event.target.value)!== -1 ||
                searchvalue.complaint_no.indexOf(event.target.value)!== -1 ||
                searchvalue.complaint_date_time.toLowerCase().indexOf(event.target.value)!== -1
            )
        });

        setComplaints(newArray);
    }

    return (
       
        <div className="card shadow p-3 mb-5 bg-white rounded complaintview">
          <div className="card-body">

             <div className="row">
                <div className="col d-flex align-items-center">
                    <h3 className="text-left font-weight-bold card-title ">My Complaints</h3>
                </div>
                                    
                <div className="col mb-2 ">
                    <div className="input-group">
                        <input className="form-control py-2 rounded-pill mr-1 pr-5 " type="search" placeholder="search" id="search" onChange={search} />
                            <span className="input-group-append">
                                <button className="btn rounded-pill border-0 ml-n5" type="button">
                                   <SearchIcon/>
                                </button>
                            </span>
                    </div>
                </div>
            </div>

             {/* show complaints */}
             <table className="table table-bordered complaint-list" id="myTable">
                 
                <thead>
                    <tr className="table-info">
                        <th scope="col">S.No</th>
                        <th scope="col">ComplaintNo.</th>
                        <th scope="col">SerialKey</th>
                        <th scope="col">Complaint</th>
                        <th scope="col">ComplaintDate</th>
                        <th scope="col">Status</th>
                   </tr>
                </thead>
                
                    <tbody id="mytbody">  
                    {
                        (complaints.length === 0)?
                         <tr>
                             <td className="text-center font-weight-bold" style={{'color':'red'}} colSpan="6" >{`No records found`}</td>
                         </tr>
                        :
                            complaints.map((complaints,index)=>{
                                return(
                                
                                <tr key={index}>
                                    <th>{++index}</th>
                                    <td>{complaints.complaint_no}</td>
                                    <td>{complaints.serial_key}</td>
                                    <td>{complaints.complaint}</td>
                                    <td>{complaints.complaint_date_time}</td>
                                    <td>
                                        {
                                            (complaints.status === 1)? <p style={{'color':'red'}} className='font-weight-bold'>open</p>:<p style={{'color':'green'}} className='font-weight-bold'>closed</p>
                                        }
                                    </td>
                                </tr>
                                )
                            })
                    }
                    </tbody>
                   
              
            </table>

            {/* refresh button */}
            <div className="row">
                <div className="col-12">
                    <span onClick={refresh_component} style={{'cursor':'pointer'}}>
                        <CachedIcon/> Refresh
                    </span>
                   
                </div>
            </div>
        </div>
        </div> 
    
    )
}

export default ComplaintView;   