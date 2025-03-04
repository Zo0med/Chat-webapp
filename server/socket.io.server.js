const {Server} = require("socket.io");

require('dotenv').config()

const createNewServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });    
    return io;
};

module.exports = createNewServer;
