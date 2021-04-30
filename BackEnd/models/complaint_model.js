/*************************Complaint model**********************************************************/


const complaintSchema=require('../Schemas/complaintSchema');

const register_model=require('../models/reg_model');


//store complaint details
exports.storeData = (req,res,next) =>{

 try
   {

      //get Data
      const {serial_key,complaint}=req.body;

      //generate a UNIQUE reference number as ComplaintNo
      const complaint_no =Math.floor(100000 + Math.random() * 900000); // (6 digit only)


      //get user id[_id] and username based on serial_key
      const result=register_model.getID(serial_key);

      result.then((result)=>{
         if(result)
         {
            const user_id=result._id;
            const full_name=result.full_name; 

            //insert complaint into database
            const newComplaint=new complaintSchema.complaint_details({
               full_name,user_id,complaint_no,serial_key,complaint
            });

            newComplaint.save((err)=>{
               if(!err)
                   {
                       next();
                   }
                else
                   {
                       res.send(`Sorry !!!! your complaint is not recorded please contact admin..' : ${err}`);
                   }
               });   

         }
      });
   }
   catch(err){
      res.send(`got error in model[exports.storeData(complaint)] : ${err}`);
   }
}



// fetch all complaints based on _id
exports.fetchComplaints =async (req,res,next)=>{
      try
      {
         const {serial_key}=req.body;
         const result =await complaintSchema.complaint_details.find({serial_key}).sort({complaint_date_time:-1})
         res.locals.complaints=result;
         next();
      }
      catch(err){
         res.send(`got error in fetchComplaints : ${err}`);
      }
      

      
}