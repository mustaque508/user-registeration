
import {React,CommonImage,useLocation,LoginForm,RegisterForm} from './Header'


const HomePage = () => {

    return (
        <>
          <div>
                <div className="content-section mt-4">
                    <div className="container mt-5">
                                <div className="row d-flex justify-content-center">
                                        <div className="content_img  col-md-6 col-xl-5  d-flex align-items-center">
                                            <CommonImage/>
                                        </div>
                                        <div className="content  col-md-6  col-xl-4">
                                        {
                                            (useLocation().pathname === "/register") ? <RegisterForm/> : <LoginForm/> 
                                        }
                                        </div>
                                </div>
                    </div>
                </div>
         </div>
        </>

    )
}

export default HomePage
