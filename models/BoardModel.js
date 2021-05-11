const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    admins: [String],
    users: [String],
    owner: { type: mongoose.Types.ObjectId, ref: 'user', required: true }

})

const BoardModel = mongoose.model('board', boardSchema)

module.exports = BoardModel