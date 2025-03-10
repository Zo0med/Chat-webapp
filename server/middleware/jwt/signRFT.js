const {sign} = require('jsonwebtoken')
const fs = require('fs')
const refkey=fs.readFileSync('ref.pem')
const signRFT = (email, uuid) => {
    return sign({email, uuid, type:"refresh"}, refkey, {
        expiresIn: "14d",
        algorithm: "RS256",
    })
}

module.exports = signRFT