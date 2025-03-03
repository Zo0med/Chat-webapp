const { verify } = require("jsonwebtoken");
const userModel = require('../../model/userModel')
require('dotenv').config({path: "../../"})
const auth = async (socket, next) => {
    try {
        let { AT } = socket.handshake.auth;
        const dec = verify(AT, process.env.JWT_SECRET);
        await userModel.findOne({ email: dec.email });
        next();
    } catch (err) {
        next(err);
    }
};
module.exports = auth