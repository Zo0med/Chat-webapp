const {verify} = require('jsonwebtoken')
const { UnAuthorizedError } = require('../error');
require('dotenv').config({path:"../"})
const certify = async (SREF) => {
    try{
        await verify(SREF, process.env.REFRESH_SECRET);
    }catch(err){
        throw new UnAuthorizedError("Log in again.")
    }
}

module.exports=certify