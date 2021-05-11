const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    archived: {type: Boolean, default: false},
    boardId: {type: mongoose.Types.ObjectId, ref: 'board'}
})

const Schedule = mongoose.model('schedule',scheduleSchema)

module.exports = Schedule