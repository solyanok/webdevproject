const User = require('../models/userModels')

class UserController {

    async deleteUser (req,res){
        const {userId} = req.body
        try{
            const removed = await User.deleteOne({_id: userId});
            res.send({removed});
        }  
            catch(e){
                res.send({e})

        }
       
    }


async updateUser(req,res){
    const {userId} = req.body
    const {email, username, password} = req.body
    try {
        const updated = await User.findOneAndUpdate( { _id: userId},
        { email, username, password},
         );
        res.send({updated});
    }
    catch(e){
        res.send(e)
    }
}
}
module.exports = new UserController();