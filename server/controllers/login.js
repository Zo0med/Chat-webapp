const { createHash } = require("crypto");
const signAT = require("../middleware/jwt/signAT");
const signRFT = require("../middleware/jwt/signRFT");
const UserModel = require("../model/userModel");

const login = async (req, res) => {
    const { email, password } = req.body;
    const o = await UserModel.findOne({ email:email });
    if(!o){
        res.status(404).json({status: 404, err:"User doesn't exist"})
    } else{
        const salted = password + o.salt;
        const hash = createHash("sha256").update(salted).digest("hex");
        if (hash === o.password) {
            res.status(200)
                .cookie("sref", signRFT(email), {
                    sameSite: "lax",
                    httpOnly: true, 
                    secure: false, // Set to true for https
                    maxAge: 8640000000,
                    httpOnly: true,
                })
                .json({ status: "Logged in", user: o.uid, AT:signAT(email)});
        }else{
            res.status(401).json({status: 401, err:"Invalid Credentials"});
        }
    }
};

module.exports = login;
