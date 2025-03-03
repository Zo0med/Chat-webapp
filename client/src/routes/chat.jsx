import createNewUserSocket from "../socket.io.client";
import refreshToken from "../refreshToken";
import App from "../App";
import { useState, useEffect } from "react";

let AT = localStorage.getItem("AT");
let { userSocket, id } = createNewUserSocket(AT);

const Chat = () => {
    const [currentRoom, updateCurrentRoom] = useState("");
    const [RoomName, updateRoomName] = useState("");
    const [message, updateMessage] = useState("");
    const [activeChatRooms, updateActiveChatRooms] = useState([]);
    const [messageList, updateMessageLists] = useState({room: []});
    const [room, updateRoom] = useState("");
    
    useEffect(() => {
        userSocket.on("require_userid", () => {
            let userid = localStorage.getItem("user");
            userSocket.emit("send_userid", userid);
        });
        userSocket.on("receive_message_room", (dataObject) => {
            updateMessageLists(prevMessages => {
                let newMessages = { ...prevMessages };
                console.log("test");
                if (newMessages[dataObject.room]) {
                    newMessages[dataObject.room].push({
                        user: dataObject.user,
                        message: dataObject.message,
                        time: dataObject.time
                    });
                } else {
                    newMessages[dataObject.room]=[{
                        user: dataObject.user,
                        msg: [{ user: dataObject.user, message: dataObject.message, time: dataObject.time }],
                        time: dataObject.time
                    }];
                }
                return newMessages;
            });
        });

        userSocket.on("id", (dataId) => {
            id = dataId;
        });

        userSocket.on("connect_error", async (err) => {
            if (err.message === "jwt expired" || err.message === "jwt malformed") {
                await getRefresh();
                let newAT = localStorage.getItem("AT");
                userSocket = createNewUserSocket(newAT).userSocket;
            } else {
                console.log(err.message);
                console.error("Server is unreliable");
            }
        });
    }, []);

    const getRefresh = async () => {
        await refreshToken();
    };

    const joinRoom = () => {
        if (currentRoom !== "") {
            userSocket.emit("JOIN", currentRoom);
        } else{
            throw new Error("Current room is null");
        }
    };

    const addRoom = () => {
        updateActiveChatRooms(prevRooms => [...prevRooms, { title: RoomName, from: "", to: room, lastmessage: "" }]);
        updateRoom("");
        updateRoomName("");
    }

    const sendMessage = () => {
        if (message.trim() && currentRoom) {
            userSocket.emit("client_message_room", { user: localStorage.getItem("user"), message, room: currentRoom });
            updateMessageLists(prevMessages => ({
                ...prevMessages,
                [currentRoom]: [
                    ...(prevMessages[currentRoom] || []), // Use an empty array as fallback if currentRoom doesn't exist yet
                    { user: localStorage.getItem("user"), message, time: new Date().toLocaleTimeString() },
                ],
            }));
            updateMessage("");
        }
    };

    return (
        <main>
            <App />
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
                                joinRoom();
                            }}>
                                <div id="horizontal-flex">
                                    <h1 className="Title">{e.title}</h1> 
                                    <p>roomid:{e.to}</p>
                                </div>
                                <div className="content-container">
                                    <p className="author">{e.from}:</p>
                                    <p className="lastmessage">{e.lastmessage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="Chat-body">
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
                </div>
            </div>
        </main>
    );
};

export default Chat;