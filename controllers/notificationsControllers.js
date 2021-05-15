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
            const rest = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { invitations: req.params.idBoard } }, { new: true })
            response = { board: selectedBoard, notification: req.params.idBoard }
            
        } catch {
            error = "Ha ocurrido un error en el servidor, intente más tarde!"
            console.log('ERROR: El controlador acceptBoard está fallando')
        }
        res.json({ success: !error ? true : false, response, error })
    },

    rejectBoard: async (req, res) => {
        let response;
        let error;
        try {
            await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { invitations: req.params.idBoard } }, { new: true })
            response = {notification: req.params.idBoard }

        } catch {
            error = "An error occurred during process, please try later."
            console.log('ERROR: The controller rejectBoard has failed')
        }
        res.json({ success: !error ? true : false, response, error })
    },

    getComponents: async (req, res) => {

        try {

            const boardsOwner = await BoardModel.find({ owner: req.user._id })
            let boardOwnerId = boardsOwner.map(board => board._id)

            const adminBoards = await BoardModel.find({ admins: { $elemMatch: { $eq: req.user._id } } })
            let boardAdminArray = adminBoards.map(board => board._id)

            const taskPlanners = await Taskplanner.find({ userId: req.user._id })

            const userTask = await Task.find({ "comments.userId": req.user._id })
            let idComents = userTask.flatMap(tasks => {
                let comments = tasks.comments.filter(comment => {
                    comment.userId.toString() === req.user._id.toString()
                    return comment._id
                })
                let commentsId = comments.map(userId => userId._id)
                return commentsId
            })

            res.json({ success: true, response: { boardOwnerId, boardAdminArray, taskPlanners, idComents } })

        } catch (error) {
            res.json({ success: false, response: 'Ha ocurrido un error en el servidor, intente más tarde!' })
        }
    }
}

module.exports = notificationsControllers