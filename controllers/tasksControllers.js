const Task = require('../models/TaskModel')
const tasksControllers = {
    getAllTasks: async (req, res) => {
        try {
            const allTasks = await Task.find()
            res.json({response: allTasks , success: true})
        } catch (error) {
            res.json({response: 'Internal server error', success: false})
        }
    },
    addTask: async (req, res) => {
        try {
            const addNewTask = new Task(req.body)
            await addNewTask.save()
            // const allTask = await Task.find()
            res.json({response: allTask, success:true})
        } catch (error) {
            res.json({response: 'Ha ocurrido un error en el servidor', success:false})
        }
    },
    editTask: async (req, res) => {
        const id = req.params.id
        try {
            const editTask = await Task.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
            res.json({ success: true, response: editTask })
        } catch (error) {
            res.json({ success: false, response: 'Internal server error' })
        }
    },
    deleteTask: async (req, res) => {
        const id = req.params.id
        try {
            const deleteTask = await Task.findOneAndDelete({ _id: id })
            res.json({ success: true, response: deleteTask })
        } catch (error) {
            res.json({ success: false, response: 'Internal server error' })
        }
    },
    tasksFromSchedule: async (req, res) => {
        const id = req.params.id
        try {
            const tasksFromSchedule = await Task.find({scheduleId: id})
            await res.json({response: tasksFromSchedule, success: true})
        } catch (error) {
            res.json({response: 'Internal server error', success:false})
        }
    },
    addComment: async (req, res) => {
        console.log(req.body)
        // const taskId = req.params.id
        // const userId = req.user._id
        // const comment = req.body.comment
        try {
            const addComment = await Task.findOneAndUpdate({ _id: req.params.id}, { $push: { comments: { userId: req.body.userId,userCompleteName: req.body.userCompleteName,message: req.body.message} } }, { new: true })
            res.json({ response: addComment, success: true })
        } catch (error) {
            res.json({ response: 'Internal server error', success: false })
        }
    },
    editComment: async (req, res) => {
        const taskId = req.params.id
        const message = req.body.message
        const idComment = req.body.idComment
        try {
            const editComment = await Task.findOneAndUpdate({ _id: taskId, "comments._id": idComment },
            { $set: { "comments.$.message": message}}, { new: true })
            res.json({ response: editComment, success: true })
        } catch (error) {
            res.json({ response: 'Internal server error', success: false })
        }
    },
    deleteComment: async (req, res) => {
        console.log(req.body)
        try {
            const deleteComment = await Task.findOneAndUpdate({ _id: req.params.id, "comments._id": idComment},
                {$pull: {comments: {_id: idComment}}}, { new: true })
            res.json({ response: deleteComment, success: true })
        } catch (error) {
            res.json({ response: 'Internal server error', success: false })
        }
    }
}
module.exports = tasksControllers                                                                                                                                                                                                                                                                                                                 