/***********Welcome Page **************************/

import {useLocation} from './Header'


const Welcome = () =>{

    const location=useLocation();

    // get username from useHistory hook
    const username=location.state;

    return (
        <>
            <div>
                <h3>Welcome back,{username}</h3>
            </div>
        </>
    );
}

export default Welcome;

