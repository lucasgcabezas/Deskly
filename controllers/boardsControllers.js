const BoardModel = require('../models/BoardModel')
const User = require("../models/UserModel")

const boardsControllers = {

    getFromUser: async (req, res) => {
        let response;
        let error;
        try {
            const selectedBoards = await BoardModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            response = selectedBoards
        } catch {
            error = "Ha ocurrido un error en el servidor, intente más tarde!"
            console.log('ERROR: El controlador getFromUser está fallando')
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
            error = "Ha ocurrido un error en el servidor, intente más tarde!"
            console.log('ERROR: El controlador addBoard está fallando')
        }
        res.json({ success: !error ? true : false, response, error })
    },

    editBoard: async (req, res) => {
        let response;
        let error;
        try {
            const board = await BoardModel.findById(req.params.id)
            if(String(board.owner) === req.user.id){
                response = await BoardModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })                
            }else{
                response = board
            }

        } catch {
            error = "Ha ocurrido un error en el servidor, intente más tarde!"
            console.log('ERROR: El controlador editBoard está fallando')
        }
        res.json({ success: !error ? true : false, response, error })
    },

    deleteBoard: async (req, res) => {
        let response;
        let error;
        try {
            const board = await BoardModel.findById(req.params.id)
            if(String(board.owner) === req.user.id){
                response = await BoardModel.findByIdAndDelete(req.params.id)
            }
        } catch {
            error = "Ha ocurrido un error en el servidor, intente más tarde!"
            console.log('ERROR: El controlador deleteBoard está fallando')
        }
        res.json({ success: !error ? true : false, response, error })
    },
    getUsersFromBoard: async (req, res) => {
        try{
            const board = await BoardModel.findById(req.params.id).populate({path:"users",select:{ "firstName":1 ,"lastName":1,"email":1,"img":1}})
            res.json({success: true, users: board.users})
        }catch(error){
            res.json({success: false, response:'Ha ocurrido un error en el servidor, intente más tarde!'})
        }
    },
    userAdmin: async (req,res) => {
        try{
            let user = await User.findOne({email: req.params.email})
            let admins = null
            if(req.body.admin){
                console.log('se agrego')
                admins = await BoardModel.findOneAndUpdate({_id:req.body.id},{$addToSet: {'admins': user._id}}).populate("admins","email")
            }else{
                admins = await BoardModel.findOneAndUpdate({_id:req.body.id},{$pull: {'admins': user._id}}).populate("admins","email")
                console.log('no se agrego')
            }
            console.log(admins)
            res.json({success: true, admins}) 

        }catch(error){
            console.log(error)
        }
    },
    getAdminsFromBoard: async (req, res) => {
        try{
            const response = await BoardModel.findById(req.params.email).populate({path:"admins",select:{"email":1}})
            res.json({response})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = boardsControllers