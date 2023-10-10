const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: { type: String, required: true },
    dueDate: {type: String, required: true},
    boards_id:{type:mongoose.Schema.ObjectId,required:true,ref:"boards"},
    complete:{type:Boolean}
    // tasks: [{ body: {type:String, required:true}, date: {type:Number} }],
})

module.exports = mongoose.model("tasks", tasksSchema);