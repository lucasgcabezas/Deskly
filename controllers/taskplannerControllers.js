const Taskplanner = require('../models/TaskplannerModel')

const taskplannerControllers = {
    addTaskplanner: async(req,res) =>{
        const newTaskplanner = new Taskplanner(req.body)
        try{
            await newTaskplanner.save()
            res.json({success: true, response: newTaskplanner})
        }catch(error){
            res.json({success: false, response: 'An error has ocurred'})
            console.log(error)
        }
    },
    putTaskplanner: async(req, res) => {
        try{
            const taskplanner = await Taskplanner.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new: true})
            res.json({success: true, response: taskplanner})
        }catch(error){
            res.json({success: false, response: 'An error has occurred'})
            console.log(error)
        }
    },

    deleteTaskplanner: async (req, res) => {
        try{
            const taskplanner = await Taskplanner.findOneAndDelete({_id: req.params.id})
            res.json({success: true, response: taskplanner})
        }catch(error){
            res.json({success: false, response: 'An error has occurred'})
            console.log(error)
        }
    },
    
    getTaskplannerFromBoard: async(req,res) => {
        try{
            const taskplanner = await Taskplanner.find({boardId: req.params.id})
            res.json({success: true, response: taskplanner})
        }catch(error){
            res.json({success: false, response: 'An error has occurred'})
            console.log(error)
        }
    },

    getAllTaskplanner: async (req,res) => {
        try{
            const taskplanner = await Taskplanner.find()
            res.json({success: true, response: taskplanner})
        }catch(error){
            res.json({success: false, response: 'An error has occurred'})
            console.log(error)
        }
    },

    getTaskplanner: async (req, res) => {
        try{
            const taskplanner = await Taskplanner.find({_id: req.params.id})
            res.json({success: true, response: taskplanner})
        }catch(error){
            res.json({success: false, response: 'An error has occurred'})
            console.log(error)
        }
    }
}

module.exports = taskplannerControllers