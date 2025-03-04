const {CustomAPIError} = require('../error/index')
const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({err: err.message})
    } else if(err.name==="TokenExpiredError"){
        console.log(err.name);
        console.log("test")
        console.log(res)
        res.status(401).json({status:401, err:err.message});
    }
    next()
}

module.exports = errorHandlerMiddleware