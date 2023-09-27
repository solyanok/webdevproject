
const Boards = require('../models/boardsModels')

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
        const {name, description} = req.body
        try{
            const added = await Boards.create({name, description});
            res.send(added)
        }
        catch(e){
            res.send(e)
        }
    }




}
module.exports = new BoardsController();