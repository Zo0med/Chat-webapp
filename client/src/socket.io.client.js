import { io } from "socket.io-client";

const createNewUserSocket = (AT) => {
    try{
        const userSocket = io("localhost:3001", {
            auth: { AT },
            transports: ['websocket', 'polling'],
            withCredentials: true,
        });
        return {userSocket, id: userSocket.id}
    }catch(err){
        console.error(err);
        return;
    }
};

export default createNewUserSocket;
