const express = require('express')
router = express.Router()
const controller = require('../controllers/userControllers')
const controllerAuth = require('../controllers/authControllers')

router.post('/add', controller.addUser)
router.post('/delete', controller.deleteUser)
router.post('/update', controller.updateUser)
router.post('/register', controllerAuth.register)
router.post('/login', controllerAuth.login)

module.exports = router