const express = require('express')
router = express.Router()
const controller = require('../controllers/userControllers')
const controllerAuth = require('../controllers/authControllers')

router.delete('/delete', controller.deleteUser)
router.post('/update', controller.updateUser)
router.post('/register', controllerAuth.register)
router.post('/login', controllerAuth.login)
router.post('/verify_token', controllerAuth.verify_token)

module.exports = router