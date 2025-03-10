const {verify} = require('jsonwebtoken')
const { UnAuthorizedError } = require('../error');
const fs = require('fs');
require('dotenv').config({path:"../"})
const pubrefkey = fs.readFileSync('pubref.pem');
const certify = async (SREF) => {
    try{
        await verify(SREF, pubrefkey);
    }catch(err){
        throw new UnAuthorizedError("Log in again.")
    }
}

module.exports=certify