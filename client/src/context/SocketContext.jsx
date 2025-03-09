import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const AT=localStorage.getItem("AT")

    useEffect(() => {
        const newSocket = io("localhost:3001", {
            auth: { AT },
            transports: ['websocket', 'polling'],
            withCredentials: true,
            autoConnect: false
        });

        setSocket(newSocket);
        socket.on("connect", () => console.log("Connected..."))
        console.log(socket)
        return () => newSocket.disconnect(); // Cleanup on unmount
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
