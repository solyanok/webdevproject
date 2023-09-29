const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    description: { type: String, required: true },
    board_id:{type:mongoose.Schema.ObjectId,required:true,ref:"boards"}
    // tasks: [{ body: {type:String, required:true}, date: {type:Number} }],
})

module.exports = mongoose.model("boards", boardsSchema);