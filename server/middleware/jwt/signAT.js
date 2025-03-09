const {sign} = require('jsonwebtoken')

const signAT = (email) => {
    const AT = sign({email, date:Date.now*Math.random()}, process.env.JWT_SECRET, {
        expiresIn: "1m"
    })
    console.log("AT: ",AT);
    return AT;
}

module.exports = signAT