const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
require("dotenv").config();

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler.js");

app.use(express.json());
app.use(express.static("./build"))
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
        exposedHeaders: "Set-Cookie",
        methods: ["POST", "GET"],
    })
);

app.use(errorHandlerMiddleware);
// routes
const router = require("./routes/router.js");
app.use("/", router);

// initialize server
const server = http.createServer(app);

const createNewServer = require("./socket.io.server.js");
createNewServer(server);

const connectDB = require("./db/connect");

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    server.listen(process.env.PORT, () =>
        console.log(`Server is listening on port: ${process.env.PORT}`)
    );
};

start();
