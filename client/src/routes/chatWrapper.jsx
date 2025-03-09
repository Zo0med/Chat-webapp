import { useState, useEffect } from "react";
import Nav from "../components/nav";
import vLogIn from "../verifyLogin";
import Chat from "./chat";
import { SocketProvider } from "../context/SocketContext";

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
            <Nav />
            <h1>Log in again</h1>
        </>
    );
};

export default ChatWrapper;
