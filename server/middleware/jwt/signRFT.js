const {sign} = require('jsonwebtoken')

const signRFT = (email) => {
    return sign({email}, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    })
}

module.exports = signRFT