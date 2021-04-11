
import {React,CommonImage,useLocation,RegisterForm,LoginForm} from './Header'

const HomePage = () => {

    return (
        <>
          <div>
                <div className="content-section">
                    <div className="container mt-5">
                                <div className="row d-flex justify-content-center">
                                        <div className="content_img col-sm-6 col-md-5 col-lg-5 d-flex align-items-center">
                                            <CommonImage/>
                                        </div>
                                        <div className="content col-sm-6 col-md-6 col-lg-4">
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
