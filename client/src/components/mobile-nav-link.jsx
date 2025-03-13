import { Link } from "react-router-dom"

const Navmlink = ({show}) =>{
    return show===true ? (
        <div className="mobile-pop">
            <Link to="/register" className="mobile-pop-element">
                Register
            </Link>
            <Link to="/login" className="mobile-pop-element">
                Login
            </Link>
            <Link to="/chat" className="mobile-pop-element">
                Chat
            </Link>
        </div>
    ):(<></>)
}

export default Navmlink