
/******************************WELCOME BAR *********************************/
import {React} from '../Header'

const WelcomeBar = (props) => {
    return (
        <>
        <div>
            <nav className="nav-bar sticky-top shadow-sm p-2 mb-5">
                <span className="u-name">WELCOME BACK, {props.username}</span>
            </nav>
        </div>
        </>
    )
}

export default WelcomeBar;