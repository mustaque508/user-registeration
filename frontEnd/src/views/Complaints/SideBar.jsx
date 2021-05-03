/************************************* sidebar ****************************/
import {React,avatar,Link} from '../Header'

const sideBar =  () => {
    return (
        <div>
            {/* {user logo } */}
            <div className="user-p">
                <img src={avatar} alt="avatar.png"/>
            </div>
            
            {/* menu */}
            <ul className="list-unstyled">
                <li>
                <Link to="/complaints">Complaints</Link> 
                </li>
                <li>
                <Link to="/videos">Videos</Link>
                </li>
            </ul>
        </div>
    )
}

export default sideBar


