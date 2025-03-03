import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <header>
            <nav className="nav">
                <Link to="/" className="nav-element Link">
                    Chatapp
                </Link>
                <div>
                    <Link to="/register" className="nav-element Link">
                        Register
                    </Link>
                    <Link to="/login" className="nav-element Link">
                        Login
                    </Link>
                    <Link to="/chat" className="nav-element Link">
                        Chat
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Nav