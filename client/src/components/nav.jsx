import { Link } from "react-router-dom"

const Nav = ({activeTab}) => {
    return (
        <header>
            <nav className="nav">
                <Link to="/" className="Link" id="main-nav">
                    Chatapp
                </Link>
                <div>
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