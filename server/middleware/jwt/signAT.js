const {sign} = require('jsonwebtoken')
const fs = require('fs')
const ATkey = fs.readFileSync('../../AT.pem')
const signAT = (email, uuid) => {
    const AT = sign({email, uuid, type:"access"}, ATkey, {
        expiresIn: "1m",
        algorithm: "RS256",
    })
    console.log("AT: ",AT);
    return AT;
}

module.exports = signAT