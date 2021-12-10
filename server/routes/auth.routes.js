const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth.controller')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/auth', authMiddleware, authController.auth)
// router.get('/user', authController.getUsers)
// router.get('/user/:id', authController.getUser)
router.patch('/', authMiddleware, authController.updateUserInfo)
router.patch('/password', authMiddleware, authController.changePassword)
router.post('/restorePass', authController.restorePass)
router.post('/newPass', authMiddleware, authController.newPass)

module.exports = router

    // [
    // check('email', 'Необходимо указать E-mail').isEmail(),
    //     check('password', 'Введите корректный пароль').isLength({min:4, max:20})
    // ],