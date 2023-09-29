const express = require('express')
router = express.Router()
const controller = require('../controllers/userControllers')

router.post('/add', controller.addUser)
router.post('/delete', controller.deleteUser)
router.post('/update', controller.updateUser)

module.exports = router