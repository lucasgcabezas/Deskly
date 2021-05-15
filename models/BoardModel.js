const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    admins: [{type: String}],
    users: [{type: String}],
    owner: { type: mongoose.Types.ObjectId, ref: 'user', required: true }
})

const BoardModel = mongoose.model('board', boardSchema)

module.exports = BoardModel