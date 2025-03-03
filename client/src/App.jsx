import "./App.css";
import Nav from "./components/nav";
import { useState, useEffect } from "react";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for 2 seconds
        setTimeout(() => setLoading(false), 500);
    }, []);
    return(
        <>
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
         <Nav />   
        </>
    )
}
export default App;
