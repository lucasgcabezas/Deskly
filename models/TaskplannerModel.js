const mongoose = require('mongoose')

const taskplannerSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    archived: {type: Boolean, default: false},
    boardId: {type: mongoose.Types.ObjectId, ref: 'board'},
    userId: {type: mongoose.Types.ObjectId, ref: 'user'}
})

const Taskplanner = mongoose.model('taskplanner',taskplannerSchema)

module.exports = Taskplanner