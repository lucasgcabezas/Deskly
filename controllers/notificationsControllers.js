const BoardModel = require('../models/BoardModel')
const User = require("../models/UserModel")
const Taskplanner = require("../models/TaskplannerModel")
const Task = require("../models/TaskModel")

const notificationsControllers = {

    acceptBoard: async (req, res) => {
        let response;
        let error;
        try {
            const selectedBoard = await BoardModel.findOneAndUpdate({ _id: req.params.idBoard }, { $addToSet: { 'users': req.user._id } }, { new: true })
            await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { invitations: req.params.idBoard } }, { new: true })

            response = { board: selectedBoard, notification: req.params.idBoard }

        } catch {
            error = "Ha ocurrido un error en el servidor, intente más tarde!"
            console.log('ERROR: El controlador acceptBoard está fallando')
        }
        res.json({ success: !error ? true : false, response, error })
    },
    
    addUserToBoard: async (req, res) => {
        try {
            let { admin, email } = req.body
            response = { board: selectedBoard, notification: req.params.idBoard }

            if (admin) {
                await BoardModel.findOneAndUpdate({ _id: req.params.id }, { $push: { 'users': email, 'admins': email } })
            } else {
                await BoardModel.findOneAndUpdate({ _id: req.params.id }, { $push: { 'users': email } })
            }

        } catch (error) {
            console.log(error)
        }
    },

    getComponents: async (req, res) => {
        const boardsOwner = await BoardModel.find({ owner: req.user._id })
        const adminBoards = await BoardModel.find({ admins: { $elemMatch: { $eq: req.user._id } } })
        // const usersBoards = await BoardModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
        const taskPlanners = await Taskplanner.find({ userId: req.user._id })
        const userTask = await Task.find({ "comments.userId": req.user._id })
        try {
            let idComents = userTask.flatMap(tasks => {
                let comments = tasks.comments.filter(comment => {
                    comment.userId.toString() === req.user._id.toString()
                    return comment._id
                })
                let commentsId = comments.map(userId => userId._id)
                return commentsId
            })
            res.json({ success: true, response: { boardsOwner, adminBoards, taskPlanners, idComents } })           
        } catch (error) {
            res.json({ success: false, response:'Ha ocurrido un error en el servidor, intente más tarde!'})
        }
    }
}

module.exports = notificationsControllers