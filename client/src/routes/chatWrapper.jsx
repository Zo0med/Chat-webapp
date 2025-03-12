import { useState, useEffect } from "react";
import Nav from "../components/nav";
import vLogIn from "../verifyLogin";
import Chat from "../components/chat";
import { SocketProvider } from "../context/SocketContext";
import { Link } from "react-router-dom";

const ChatWrapper = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await vLogIn();
            setIsLoggedIn(loggedIn);
        };
        checkLogin();
    }, []);
    useEffect(() => {
        console.log("isLoggedIn state changed:", isLoggedIn);
    }, [isLoggedIn]);
    
    if (isLoggedIn === null) {
        return <p>Loading...</p>; // Show a loading state while checking login
    }
    
    return isLoggedIn ? (
        <SocketProvider>
            <Chat />
        </SocketProvider>
    ) : (
        <>
            <Nav activeTab={3}/>
            <div id="translate">
                <div id="error-wrapper">
                    <h1>Please log in</h1>
                    <Link to="/login" id="error-Link">Login</Link>
                </div>
            </div>
        </>
    );
};

export default ChatWrapper;
