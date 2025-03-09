const { verify } = require("jsonwebtoken");
const userModel = require("../../model/userModel");
require("dotenv").config("../../");

const auth = async (socket, next) => {
    try {
        let { AT } = socket.handshake.auth;
        if (!AT) throw new Error("jwt must be provided");
        console.log("AT verifier middleware");
        const dec = verify(AT, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: dec.email });
        if (!user) throw new Error("User not found");
        socket.user = user;
        return next();
    } catch (err) {
        console.log("Auth error:", err.message);
        if (["jwt expired", "jwt malformed", "jwt must be provided"].includes(err.message)) {
            console.log("Triggering refresh...");
            socket.emit("refresh", { message: err.message });
        }
        return next(err); // Continue but with an error (might disconnect the client)
    }
};

module.exports = auth;
