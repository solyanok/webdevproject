const Tasks = require('../models/tasksModels')
const boards = require('../models/boardsModels')
const ObjectId = require('mongoose').Types.ObjectId

class TasksController {

    async showAllTasks(req,res){
        try{
            const all = await Tasks.find({});
            res.send(all)
        }
        catch(e){
            res.send(e)
        }
    }

    async addNewTask(req,res){
        const {name, description, dueDate, boards_id} = req.body
        try{


    const added = await Tasks.create({name, description, dueDate, boards_id: new ObjectId(boards_id)});
    res.send(added)
console.log(added);
        }
        catch(e){
            res.send(e)
        }
    }

    async updateTask(req,res){
        const {TaskId} = req.body
        const {name, description} = req.body
        try {
            const updated = await Tasks.findOneAndUpdate( { _id: TaskId },
            { name, description },
             );
            res.send({updated});
        }
        catch(e){
            res.send(e)
        }
    }
    async deleteTask (req, res){
        const { taskId } = req.body;
        console.log(taskId);
        try{
            const removed = await Tasks.deleteOne({_id: taskId});
            if (removed.deletedCount === 1) {
            res.send({ok: true, message: 'Task deleted successfully'})}
        else {
            res.send({ok: false, message: 'Smth went wrong'})  
        }

        }  
            catch(e){
                res.send({e})
            }  
        }
        async showOneTask(req,res){
            const {taskId} = req.body;
                try{
                    const showone = await Tasks.findOne({_id:taskId});
                    res.send(showone);
                }
            catch(e){
                res.send(e)
            }
        }
        async completeTask (req, res){
            const { taskId, completed } = req.body;
            try {
                const updated = await Tasks.findOneAndUpdate( { _id: taskId },
                { completed},
                 );
                 res.json({ ok: true, message: 'Task updated successfully' });
            }
            catch(e){
                res.send(e)
            }

}
}
module.exports = new TasksController();