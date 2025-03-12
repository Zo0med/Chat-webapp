import refreshToken from "../refreshToken";
import { useState, useEffect, useContext} from "react";
import ConnectionManager from "../connectionManager";
import Nav from "../components/nav";
import {useSocket} from "../context/SocketContext";

const Chat = () => {
    const [currentRoom, updateCurrentRoom] = useState("");
    const [RoomName, updateRoomName] = useState("");
    const [message, updateMessage] = useState("");
    const [activeChatRooms, updateActiveChatRooms] = useState([]);
    const [messageList, updateMessageLists] = useState({room: []});
    const [room, updateRoom] = useState("");
    const [AT , updateAT] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    // Socket given by context
    const socket = useSocket();
    
    const getRefresh = async () => {
        try {
            const response = await refreshToken(); // Call API
            console.log(response);
            localStorage.setItem("AT", response.AT);
            const newAT=response.AT;
            console.log("Updated Access Token:", newAT);
            updateAT(newAT);
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    const joinRoom = (room) => {
        if (room !== "") {
            socket.emit("JOIN", room);
        } else{
            throw new Error("Current room is null");
        }
    };

    const addRoom = () => {
        if(room !== "" && RoomName !==""){
            updateActiveChatRooms(prevRooms => [...prevRooms, { title: RoomName, to: room }]);
            updateRoom("");
            updateRoomName("");
        }else{
            alert("Fill in all room info")
        }
    }

    const sendMessage = () => {
        if (message.trim() && currentRoom) {
            socket.emit("client_message_room", { user: localStorage.getItem("user"), message, room: currentRoom });
            updateMessage("");
        }
    };

    useEffect(() => {
        updateAT(localStorage.getItem("AT"));
        console.log(socket)
        if (!socket) return; // Wait until the socket is initialized
        console.log("Setting up socket listeners...");

        socket.on("receive_message_room", (dataObject) => {
            console.log("Received message:", dataObject);
            updateMessageLists(prevMessages => {
                let newMessages = { ...prevMessages };
                if (newMessages[dataObject.room]) {
                    newMessages[dataObject.room].push({
                        user: dataObject.user,
                        message: dataObject.message,
                        time: dataObject.time
                    });
                } else {
                    newMessages[dataObject.room] = [{
                    user: dataObject.user,
                    message: dataObject.message,
                    time: dataObject.time
                    }];
                }
                return newMessages;
            });
        });

        socket.on("refresh", async () => {
            try{
                console.log("Refreshing token...");
                await getRefresh();
                let newAT = localStorage.getItem("AT");
                updateAT(newAT);
                console.log("New token:", newAT);
                socket.auth = {AT:newAT};
                socket.disconnect();
                socket.connect()
                console.log("Token updated and reconnected");
            }catch(err){
                console.log(err);
            }
        });
    
        return () => {
            console.log("Cleaning up socket listeners...");
            socket.off("receive_message_room");
            socket.off("r");
        };
    }, [socket]);
    
    return (
        <main id="chat-main">
            <Nav activeTab={3}/>
            <div className="Chat-main-container">
                <div className="Open-chats">
                    <div className="Room-change-container">
                        <input
                            type="text"
                            className="input"
                            placeholder="Name"
                            value={RoomName}
                            onChange={(event) => updateRoomName(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && addRoom()}
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder="Room id"
                            value={room}
                            onChange={(event) => updateRoom(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && addRoom()}
                        />
                        <button className="SubmitBtn" onClick={addRoom}>Add</button>
                    </div>
                    <div className="Chats-container">
                        {activeChatRooms.map((e, index) => (
                            <div key={index} className="ChatElement-container" onClick={() => {
                                updateCurrentRoom(e.to);
                                joinRoom(e.to);
                            }}>
                                <div id="vertical-flex">
                                    <h1 className="Title">{e.title}</h1> 
                                    <p>roomid: <span>{e.to}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-main">
                    <div className="Chat-body">
                        <div id="messages-container">
                            {messageList[currentRoom] ? (
                                messageList[currentRoom].map((msg, index) => (
                                    <div key={index} className="message">
                                        <strong>{msg.user}:</strong> {msg.message} <span>{msg.time}</span>
                                    </div>
                                    ))
                                ) : (
                                    <p>No messages yet</p>  
                                )
                            }
                        </div>
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            className="input"
                            placeholder="Write a message"
                            value={message}
                            onChange={(event) => updateMessage(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                        />
                        <button className="SubmitBtn" onClick={sendMessage}>Submit</button>
                        <p className="id">Current room: {currentRoom}</p>
                        <p className="id">Id: {localStorage.getItem("user")}</p>
                        <button  className="SubmitBtn" id="connect" onClick={() => {
                            if(!socket.connected){
                                socket.connect();
                                socket.connected=true;
                            }else{
                                socket.disconnect();
                                socket.connected=false;
                            }
                            console.log("Chat.jsx' Socket status: ", socket.connected) 
                            setIsConnected(socket.connected);
                        }}>Connect/Disconnect</button>
                        <p id="status">Status: { isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Chat;