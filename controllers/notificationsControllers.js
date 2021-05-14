const BoardModel = require('../models/BoardModel')
const User = require("../models/UserModel")

const notificationsControllers = {

    acceptBoard: async (req, res) => {
        let response;
        let error;
        // Con passport
        try {
            const selectedBoard = await BoardModel.findOneAndUpdate({ _id: req.params.idBoard }, { $addToSet: { 'users': req.user._id } }, { new: true })
            await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { invitations: req.params.idBoard } }, { new: true })



            // console.log(selectedBoard)

            // oardModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })







            response = { board: selectedBoard, notification: req.params.idBoard}




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
                    try {
                        const deletedBoard = await BoardModel.findByIdAndDelete(req.params.id)
                        response = deletedBoard

                    } catch {
                        error = "An error occurred during process, please try later."
                        console.log('ERROR: The controller deleteBoard has failed')
                    }
                    res.json({ success: !error ? true : false, response, error })
                },

                    addUserToBoard: async (req, res) => {
                        try {
                            let { admin, email } = req.body

                            if (admin) {
                                await BoardModel.findOneAndUpdate({ _id: req.params.id }, { $push: { 'users': email, 'admins': email } })
                            } else {
                                await BoardModel.findOneAndUpdate({ _id: req.params.id }, { $push: { 'users': email } })
                            }

                        } catch (error) {
                            console.log(error)
                        }
                    },


}

module.exports = notificationsControllers