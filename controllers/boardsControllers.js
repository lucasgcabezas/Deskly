const BoardModel = require('../models/BoardModel')

const boardsControllers = {

    getFromUser: async (req, res) => {
        let response;
        let error;

        // Con passport
        try {
            const selectedBoards = await BoardModel.find({ "users": req.user._id })
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
            const boardToAdd = new BoardModel(req.body)
            await BoardModel.save()
            // const allItineraries = await ItineraryModel.find()
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

        try {
            await BoardModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
            const boardEdited = BoardModel.findById(req.params.id)
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