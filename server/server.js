const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const router = require("./routes/router.js");
const auth = require("./middleware/socketio-middlewares/auth");

require("dotenv").config();

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler.js");

app.use(express.json());
app.use(express.static("./build"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
    exposedHeaders: "Set-Cookie",
    methods: ["POST", "GET"],
  })
);

app.use(errorHandlerMiddleware);
// routes
app.use("/", router);

// initialize server
const server = http.createServer(app);

const createNewServer = require("./socket.io.server.js");
const io = createNewServer(server);

// Socket.io part

io.use(auth);
io.on("connect", (socket) => {
    console.log(`Connected: ${socket.id}`);   
    socket.emit("id", socket.id);
    socket.emit("require_userid", true);

    socket.on("send_userid", (userid) => {
        userStorage.set(socket.id, userid);
        reverseUserStorage.set(userid, socket.id);
    });
    socket.on("JOIN", (room) => {
        console.log(room);
        console.log("join");
        if (!room) {
        socket.emit("connect_error", "need_refresh");
        }
        socket.join(room);
        socket
        .to(room)
        .emit("join_allert", {
            msg: `Joined room: ${room}`,
            user: `${socket.id}`,
        });
    });
    socket.on("client_message_room", (data) => {
        console.log(data);
        socket
        .to(data.room)
        .emit("receive_message_room", {
            room: data.room,
            user: data.user,
            message: data.message,
            time: Date.now().toLocaleString(),
        });
    });
    socket.on("disconnect", (disconnectedSocket) => {
        console.log("Client disconnected:", socket.id);
    });
});

// Database
const connectDB = require("./db/connect");

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  server.listen(process.env.PORT, () =>
    console.log(`Server is listening on port: ${process.env.PORT}`)
  );
};

start();
