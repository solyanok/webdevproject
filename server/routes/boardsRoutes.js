const express = require('express')
router = express.Router()
const controller = require('../controllers/boardsControllers')

router.get('/', controller.showAllBoards);
router.post('/add', controller.addNewBoard);

module.exports = router