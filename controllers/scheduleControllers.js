const Schedule = require('../models/Schedule')

const scheduleControllers = {
    addSchedule: async(req,res) =>{
        const newSchedule = new Schedule(req.body)
        try{
            await newSchedule.save()
            res.json({success: true, respuesta: newSchedule})
        }catch(error){
            res.json({success: false, respuesta: 'An error has ocurred'})
            console.log(error)
        }
    },
    putSchedule: async(req, res) => {
        try{
            const schedule = await Schedule.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new: true})
            res.json({success: true, respuesta: schedule})
        }catch(error){
            res.json({success: false, respuesta: 'An error has occurred'})
            console.log(error)
        }
    },
    deleteSchedule: async (req, res) => {
        try{
            const schedule = await Schedule.findOneAndDelete({_id: req.params.id})
            res.json({success: true, respuesta: schedule})
        }catch(error){
            res.json({success: false, respuesta: 'An error has occurred'})
            console.log(error)
        }
    },
    getScheduleFromBoard: async(req,res) => {
        try{
            const schedule = await Schedule.find({idBoard: req.params.id})
            res.json({success: true, respuesta: schedule})
        }catch(error){
            res.json({success: false, respuesta: 'An error has occurred'})
            console.log(error)
        }
    },
    getAllSchedule: async (req,res) => {
        try{
            const schedule = await Schedule.find()
            res.json({success: true, respuesta: schedule})
        }catch(error){
            res.json({success: false, respuesta: 'An error has occurred'})
            console.log(error)
        }
    },
    getSchedule: async (req, res) => {
        try{
            const schedule = await Schedule.find({_id: req.params.id})
            res.json({success: true, respuesta: schedule})
        }catch(error){
            res.json({success: false, respuesta: 'An error has occurred'})
            console.log(error)
        }
    }
}

module.exports = scheduleControllers