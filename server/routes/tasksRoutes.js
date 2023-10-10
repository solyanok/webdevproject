const express = require('express')
router = express.Router()
const controller = require('../controllers/tasksControllers')

router.get('/home', controller.showAllTasks);
router.post('/add', controller.addNewTask);
// router.post('/update', controller.updateTask)
router.delete('/delete', controller.deleteTask)
// router.get('/board', controller.showOneTask)
router.post('/complete', controller.completeTask)
module.exports = router