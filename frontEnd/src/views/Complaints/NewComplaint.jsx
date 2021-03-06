/************************New Complaint ***********************/


import {React,MuiThemeProvider,colortheme,Button,useState,BootstrapTooltip,axios,toast} from '../Header'



const NewComplaint = (props) =>{

    //get serail_key value from props
    const {serial_key}=props;

    // get input fields
    const [complaint_details, setComplaint_details]=useState({
        serial_key,
        'complaint':''
    });

     // error_fields
     const[errors,setErrors]=useState({
        'complaint_error':'',
    });
   
     // show tooltip 
     const [open, setOpen] = useState(false);

    
    // change input fields based on [onchange ]
    const inputEvent = (event) =>{
        setComplaint_details({
            serial_key,
            complaint:event.target.value
        });
    }

     //Hide Tooltip
     const hideToolTip =() =>{
        setOpen(false);
    }


    //submit form 
    const submit = (event)=>{
        event.preventDefault();
       
        //send data
        axios.post('/storeComplaint',complaint_details)
        .then((res)=>{
            if(res.data.errors)
            {
                const {complaint_error}=res.data.errors;
                setErrors({
                    complaint_error
                });
                setOpen(true);
            }
            else
            {
                if(res.data.success)
                {
                    setComplaint_details({
                        'complaint':''
                    });
                    event.target.reset();
                    setOpen(false);
                    toast.success(res.data.success);
                }
                else
                {
                    toast.error(res.data,{autoClose: false});
                }
            }

        }).catch((err)=>{
            console.log(`got error when passing input fields to /storeComplaint: ${err}`);
        });
        
    }

    return (
        <>
            <div className="card shadow p-3 mb-5 bg-white rounded newcomplaint">
                <div className="card-body">
                <h3 className="text-left font-weight-bold card-title mt-1">Add New Complaint</h3>

                    <form onSubmit={submit} method="POST" className="form-group" id="submit" autoComplete="off">

                       {/* Serial Key */}
                       <label htmlFor="serial_key" className="mb-0 mt-2">Serial Key</label>
                       <input  className="form-control mt-0" type="text" name="serial_key" id="serial_key"  defaultValue={serial_key} readOnly/>

                        {/* complaint */}
                        <BootstrapTooltip title={errors.complaint_error} placement="right-start" open={open}>
                        <textarea  className="form-control mt-2" placeholder="Write your complaint ...." name="complaint" id="complaint" rows="12" onChange={inputEvent} onKeyUp={hideToolTip}>
                        </textarea>
                        </BootstrapTooltip>
                        

                         {/* submit button */}
                         <MuiThemeProvider theme={colortheme}>
                            <Button  type="submit" variant="contained" color="primary" className="mt-3">submit</Button>  
                        </MuiThemeProvider>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewComplaint;