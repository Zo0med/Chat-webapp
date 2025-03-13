import { Link } from "react-router-dom"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Navmlink from "./mobile-nav-link"
const Nav = ({activeTab}) => {
    const [show, setShow] = useState(false);
    return (
        <header>
            <nav className="nav">
                <div className="mobile">
                    <FontAwesomeIcon icon={faBars} size="2x" onClick={() => setShow(!show)}/>
                </div>
                <Navmlink show={show}/>
                <Link to="/" className="Link" id="main-nav">
                    Chatapp
                </Link>
                <div className="mobile-hidden">
                    <Link to="/register" className={activeTab===1? "nav-element Link nav-border" : "nav-element Link"}>
                        Register
                    </Link>
                    <Link to="/login" className={activeTab===2? "nav-element Link nav-border" : "nav-element Link"}>
                        Login
                    </Link>
                    <Link to="/chat" className={activeTab===3? "nav-element Link nav-border" : "nav-element Link"}>
                        Chat
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Nav