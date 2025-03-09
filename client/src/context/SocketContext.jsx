import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

// Crea il contesto
const SocketContext = createContext(null);

// Custom hook per accedere al contesto
export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const AT = localStorage.getItem("AT");

    useEffect(() => {
        const newSocket = io("http://localhost:3001", {
            auth: { AT },
            transports: ['websocket', 'polling'],
            withCredentials: true,
            autoConnect: false,
        });

        setSocket(newSocket);
        newSocket.connect();
        newSocket.on("connect", () => console.log("Connected..."));

        return () => {
            newSocket.disconnect();
        };
    }, []); 

    if (!socket) {
        return <div>Loading...</div>; 
    }

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
