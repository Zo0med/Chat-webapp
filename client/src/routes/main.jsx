import Nav from "../components/nav";
import { useState, useEffect } from "react";

function Main() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 500);
    }, []);
    return(
        <>
        <Nav />   
         <div className="app-container">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div>
                    <h1>Welcome to My Chatapp!</h1>
                    <p>To use this simulation please signup in the register page</p>
                </div>
            )}
        </div>
        </>
    )
}
export default Main;
