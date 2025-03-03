const jwt = require('jsonwebtoken');
const UserModel = require('../../model/userModel');
const { InternalError } = require('../../error');
require('dotenv').config({path:"../../"})
const refreshMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.cookie) throw new InternalError("Login again");
        const sref = req.headers.cookie;
        const RFT = sref.split("=")[1]
        const dec = jwt.verify(RFT, process.env.REFRESH_SECRET)
        const q = await UserModel.findOne({email: dec.email})
        const newAT = jwt.sign({email: dec.email}, process.env.JWT_SECRET, { 
            expiresIn: "30s"
        })
        res.status(200)
            .json({user: q.uid, AT:newAT })
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = refreshMiddleware