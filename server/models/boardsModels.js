const mongoose = require("mongoose");

const boardsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: { type: String, required: true },
    userId:{type:mongoose.Schema.ObjectId,required:true,ref:"user"},
    // tasks: [{ body: {type:String, required:true}, date: {type:Number} }],
})

module.exports = mongoose.model("boards", boardsSchema);