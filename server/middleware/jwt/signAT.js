const {sign} = require('jsonwebtoken')

const signAT = (email) => {
    return sign({email}, process.env.JWT_SECRET, {
        expiresIn: "30s"
    })
}

module.exports = signAT