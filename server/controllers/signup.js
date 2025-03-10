const { createHash, randomBytes, randomUUID } = require("crypto");
const UserModel = require("../model/userModel");
const { v4 } = require("uuid");

const signup = async (req, res) => {
    const { id, email, password } = req.body;
    const dusername = await UserModel.findOne({uid:id});
    const demail = await UserModel.findOne({email:email});
    if (demail) {
        res.status(409).send("Email already registered")
    }else if(dusername){
        res.status(409).send("Username already used")
    }else{
        const uuid = v4();
        const salt = randomBytes(16).toString("hex");
        const salted = password + salt;
        console.log(salted);
        const hash = createHash("sha256").update(salted).digest("hex");
        await UserModel.create({ uid:id, email, password: hash, salt, uuid});
        res.status(200).json({ status: "Created"});
    }
};

module.exports = signup;
