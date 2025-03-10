const jwt = require('jsonwebtoken');
const UserModel = require('../../model/userModel');
const { InternalError } = require('../../error');
const fs = require('fs');
require('dotenv').config({path:"../../"});
const pubrefkey = fs.readFileSync('pubref.pem');
const ATkey = fs.readFileSync('AT.pem');
const refreshMiddleware = async (req, res, next) => {
    try {
        console.log("Refresh middleware")
        if(!req.headers.cookie) throw new InternalError("Login again");
        const sref = req.headers.cookie;
        const RFT = sref.split("=")[1]
        const dec = jwt.verify(RFT, pubrefkey)
        const q = await UserModel.findOne({email: dec.email})
        const newAT = jwt.sign({email: dec.email, uuid:q.uuid, type:"access"}, ATkey, { 
            expiresIn: "1m",
            algorithm:"RS256"
        })
        res.status(200)
            .json({user: q.uid, AT:newAT})
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = refreshMiddleware