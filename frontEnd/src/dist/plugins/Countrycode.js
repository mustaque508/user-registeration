
     /**********initial plugin for contact number********************************/

import {intlTelInput,util,validator} from '../../views/Header'

const plugin_for_contact =(props)=>{
     
    // initialise plugin
        const  iti =intlTelInput(props, {
            preferredCountries:["in"],
            autoHideDialCode: true,
            autoPlaceholder: false,
            nationalMode: false,
            utilsScript:util
        });
          
         // check whether entered contact number is correct or not based on country code
        if(validator.isEmpty(props.value))
        {
            return "required";
        }
        else
        {
            return (iti.isValidNumber() === false) ? "Please enter valid contact number" : "";
        }

       
       
}



export {plugin_for_contact};
