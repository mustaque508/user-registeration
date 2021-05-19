/************************************* sidebar ****************************/
import {React,avatar,Link,ForumIcon,VideoLibraryIcon,ExitToAppOutlinedIcon,$,Cookies,toast,useHistory,useEffect,useState} from '../Header'


//get window dimensions
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
 function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

const SideBar =  () => {

    const { width } = useWindowDimensions();

    //remove animation class
    if(width>768){
        $('.side-bar').removeClass("animate__animated animate__slideInLeft");
        $('.side-bar').removeClass("animate__animated animate__slideOutLeft");
    }
   

    const history=useHistory();

    //hide sidebar
    const hideSidebar = () =>{
        if($(window).width()<760){
            $('.side-bar').removeClass("animate__animated animate__slideInLeft");
            $('.side-bar').addClass("animate__animated animate__slideOutLeft");
        }
       
    }


    //logout
    const logout= () =>{

        //clear cookies
        Cookies.remove('email_cookie');
        Cookies.remove('password_cookie');
        Cookies.remove('rememberme_cookie');

        //redirect home
        toast.success(`You have successfully logged out !!`);
        history.push('/');
       

    }

    return (

        <div className="side-bar shadow p-3 mb-5">

            {/* {user logo } */}
            <div className="user-p">
                <img src={avatar} alt="avatar.png"/>
            </div>
            
            {/* menu */}
            <ul className="list-unstyled">
                <li onClick={hideSidebar}>
                    <Link to="/complaints"><ForumIcon className="mr-2"/> Complaints</Link> 
                </li>
                <li onClick={hideSidebar}>
                  <Link to="/videos"><VideoLibraryIcon className="mr-2" /> Videos</Link>
                </li>
                <li onClick={logout}>
                <Link to="#"><ExitToAppOutlinedIcon className="mr-2" /> Logout</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar


