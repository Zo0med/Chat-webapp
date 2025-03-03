const {Server} = require("socket.io");
const auth = require('./middleware/socketio-middlewares/auth');
const userStorage = new Map()
const reverseUserStorage = new Map()

require('dotenv').config()

const createNewServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: false,
        },
    });    
    io.on("connect", (socket) => {
        console.log(`Connected: ${socket.id}`);
        socket.emit("id", socket.id)
        socket.emit("require_userid", true)
        socket.on("send_userid", (userid) => {
            userStorage.set(socket.id, userid)
            reverseUserStorage.set(userid, socket.id)
        })
        socket.on("JOIN", (room) => {
            console.log(room);
            console.log("join");
            if(!room){
                socket.emit("connect_error", "need_refresh")
            }
            socket.join(room)
            socket.to(room).emit("join_allert", {msg: `Joined room: ${friendid}`, user: `${socket.id}`}) 
        })
        socket.on("client_message_room", (data) => {
            console.log(data);
           socket.to(data.room).emit("receive_message_room", {room: data.room, user: data.user, message: data.message, time: Date.now().toLocaleString()})
        });
        socket.on("disconnect", (disconnectedSocket) => {
            const userid = userStorage.get(socket.id)
            userStorage.delete(socket.id)
            reverseUserStorage.delete(userid)
        })
    })
};

module.exports = createNewServer;
