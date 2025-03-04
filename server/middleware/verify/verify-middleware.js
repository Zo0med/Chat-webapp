const certify = require ("../../controllers/verify");
const { UnAuthorizedError } = require("../../error");

const vrfm = async (req, res, next) => {
    try{
        let SREF = req.headers.cookie;
        console.log(req.headers)
        console.log(SREF)
        if(!SREF) {
            res.status(401).json({message: "Log in again"});
            return next(new UnAuthorizedError("Log in again."));
        };
        SREF = SREF.split("=")[1];
        console.log(SREF);
        await certify(SREF);
        res.status(200).json({message:"authorized"});
        return next();
    }catch(err){
        return next(err);
    }
}
module.exports=vrfm