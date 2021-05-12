const BoardModel = require('../models/BoardModel')

const boardsControllers = {

    getFromUser: async (req, res) => {
        let response;
        let error;
        // Con passport
        try {
            const selectedBoards = await BoardModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            console.log(selectedBoards)
            response = selectedBoards

        } catch {
            error = "An error occurred during process, please try later."
            console.log('ERROR: The controller getForUser has failed')
        }
        res.json({ success: !error ? true : false, response, error })
    },

    addBoard: async (req, res) => {
        let response;
        let error;
        try {
            const boardToAdd = new BoardModel({ ...req.body, owner: req.user._id, users: [req.user._id] })
            await boardToAdd.save()
            response = boardToAdd
        } catch {
            error = "An error occurred during process, please try later."
            console.log('ERROR: The controller addBoard has failed')
        }
        res.json({ success: !error ? true : false, response, error })
    },

    editBoard: async (req, res) => {
        let response;
        let error;
        console.log(req.params.id, req.body)
        try {
            const boardEdited = await BoardModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
            response = boardEdited

        } catch {
            error = "An error occurred during process, please try later."
            console.log('ERROR: The controller editBoard has failed')
        }
        res.json({ success: !error ? true : false, response, error })
    },

    deleteBoard: async (req, res) => {
        let response;
        let error;
        console.log(req.params.id)
        try {
            const deletedBoard = await BoardModel.findByIdAndDelete(req.params.id)
            response = deletedBoard

        } catch {
            error = "An error occurred during process, please try later."
            console.log('ERROR: The controller deleteBoard has failed')
        }
        res.json({ success: !error ? true : false, response, error })
    }
}

module.exports = boardsControllers