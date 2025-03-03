const router = require('express').Router()
const loginController = require('../controllers/login')
const signupController = require('../controllers/signup')
const refreshMiddleware = require('../middleware/auth/RefreshMiddleware')

router.route("/auth/login").post(loginController)
router.route("/auth/register").post(signupController)
router.route("/auth/refresh").get(refreshMiddleware)

module.exports = router