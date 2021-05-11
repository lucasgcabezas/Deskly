const mongoose = require ('mongoose')
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    expiration: {type: String},
    priority: {type: Number, min:1, max:5},
    comments: [{userId:{type: mongoose.Types.ObjectId, ref:'user'}, userCompleteName: {type: String}, message:{type: String}}],
    verify: {type: Boolean, default: false},
    scheduleId: {type:mongoose.Types.ObjectId, ref: 'schedule', required: true}
})
const TaskModel = mongoose.model('task', taskSchema)
module.exports = TaskModel

