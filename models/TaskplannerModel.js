const mongoose = require('mongoose')

const taskplannerSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    archived: {type: Boolean, default: false},
    boardId: {type: mongoose.Types.ObjectId, ref: 'board'}
})

const Taskplanner = mongoose.model('taskplanner',taskplannerSchema)

module.exports = Taskplanner