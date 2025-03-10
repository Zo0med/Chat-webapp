const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    uuid:{
        type:String,
        required: true,
    },
    uid:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt:{
        type: String,
        required: false,
    },
});

const UserModel = model("userModel", UserSchema, "users");

module.exports = UserModel