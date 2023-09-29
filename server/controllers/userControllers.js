const User = require('../models/userModels')

class UserController {

    async addUser (req,res){
        const {email, password} = req.body
        try{
        if(!await User.findOne({ email, password })){
            const added = await User.create({email, password});
            res.send(added)
        }
        else{
            res.send("An account is already registered with your email address")
        }
        }
        catch(e){
            res.send(e)
        }
    }

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
    const {email, password} = req.body
    try {
        const updated = await User.findOneAndUpdate( { _id: userId },
        { email, password},
         );
        res.send({updated});
    }
    catch(e){
        res.send(e)
    }
}
}
module.exports = new UserController();