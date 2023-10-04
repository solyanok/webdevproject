const Boards = require('../models/boardsModels')
const User = require('../models/userModels')
const ObjectId = require('mongoose').Types.ObjectId

class BoardsController {

    async showAllBoards(req,res){
        try{
            const all = await Boards.find({});
            res.send(all)
        }
        catch(e){
            res.send(e)
        }
    }

    async addNewBoard(req,res){
        const {name, description, userId} = req.body
        try{

if(found){
    const added = await Boards.create({name, description,user_id: new ObjectId(userId)});
    res.send(added)
} 
        }
        catch(e){
            res.send(e)
        }
    }
    async updateBoard(req,res){
        const {boardId} = req.body
        const {name, description} = req.body
        try {
            const updated = await Boards.findOneAndUpdate( { _id: boardId },
            { name, description },
             );
            res.send({updated});
        }
        catch(e){
            res.send(e)
        }
    }
    async deleteBoard (req, res){
        const { boardId } = req.body;
        console.log(boardId);
        try{
            const removed = await Boards.deleteOne({_id: boardId});
            res.send({removed});
        }  
            catch(e){
                res.send({e})
            }  
        }
        async showOneBoard(req,res){
            const {boardId} = req.body;
                try{
                    const showone = await Boards.findOne({_id:boardId});
                    res.send(showone);
                }
            catch(e){
                res.send(e)
            }
        }

}
module.exports = new BoardsController();