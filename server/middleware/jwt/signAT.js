const {sign} = require('jsonwebtoken')

const signAT = (email) => {
    console.log(sign({email, date:Date.now}, process.env.JWT_SECRET))
    return sign({email, date:Date.now*Math.random()}, process.env.JWT_SECRET, {
        expiresIn: "30s"
    })
}

module.exports = signAT