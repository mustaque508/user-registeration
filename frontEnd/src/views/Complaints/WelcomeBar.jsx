
/******************************WELCOME BAR *********************************/
import {React,$} from '../Header'



const WelcomeBar = (props) => {

    const displaymenu=(event)=>{
        let value =event.target.type === "checkbox" ? event.target.checked : event.target.value;
    
        if(value || $('.side-bar').hasClass("animate__animated animate__slideOutLeft"))
        {
            $('.side-bar').removeClass("animate__animated animate__slideOutLeft");
            $('.side-bar').addClass("animate__animated animate__slideInLeft");
            $('.side-bar').css("z-index","100");
            $('.side-bar').css('width','100%');
            $('.side-bar').css('display','inline');
        }
        else
        {
            $('.side-bar').removeClass("animate__animated animate__slideInLeft");
            $('.side-bar').addClass("animate__animated animate__slideOutLeft");
        
        }

       
    }


    return (
        <>
        <div className="WelcomeBar">
            <nav className="nav-bar sticky-top shadow-sm p-2 mb-5">
                <input type="checkbox" id="checkbox" onClick={displaymenu}/>
                    <label htmlFor="checkbox">
                    <i id="navbtn" className="fa fa-bars" aria-hidden="true" title="menu"></i>
                    </label>
                <span className="u-name ">WELCOME BACK, <b className="text-capitalize">{props.username}</b></span>
            </nav>
        </div>
        </>
    )
}

export default WelcomeBar;