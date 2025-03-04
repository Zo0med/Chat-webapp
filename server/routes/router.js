const router = require('express').Router()
const loginController = require('../controllers/login')
const signupController = require('../controllers/signup')
const refreshMiddleware = require('../middleware/auth/RefreshMiddleware')
const vrfm  = require('../middleware/verify/verify-middleware')

router.route("/auth/login").post(loginController)
router.route("/auth/register").post(signupController)
router.route("/auth/refresh").get(refreshMiddleware)
router.route("/auth/verify").get(vrfm);
module.exports = router