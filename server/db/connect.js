const { connect } = require('mongoose')

const connectDB = async(url) => {
    return connect(url, {}, () => console.log(`Developement DB connected`))
}

module.exports = connectDB