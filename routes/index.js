const express = require('express')
const router = express.Router()
const scheduleControllers = require('../controllers/scheduleControllers')
const boardsControllers= require('../controllers/boardsControllers')
const userControllers = require ('../controllers/userControllers')
const tasksControllers = require ('../controllers/tasksControllers')

const { newUser, login, reLogin } = userControllers
const { getAllSchedule, getSchedule, getScheduleFromBoard, addSchedule, putSchedule, deleteSchedule } = scheduleControllers
const { getFromUser, addBoard, editBoard, deleteBoard } = boardsControllers
const {getAllTasks, addTask, editTask, deleteTask, tasksFromSchedule, addComment, editComment, deleteComment} = tasksControllers

// routes boardsControllers 
router.route('/board')
.post(addBoard)

router.route('/board/:id')
.get(getFromUser)
.post(editBoard)
.delete(deleteBoard)

// routes scheduleControllers
router.route('/schedule')
.get(getAllSchedule)
.post(addSchedule)

router.route('/schedule/:id')
.get(getSchedule)
.put(putSchedule)
.delete(deleteSchedule)

router.route('/scheduleFromBoard/:id')
.get(getScheduleFromBoard)

// routes userControllers
router.route("/newuser")
.post(newUser)

router.route("/login")
.post(login)

// router.route("/relogin")
// .get(passport.authenticate('jwt', {session: false}), reLogin)

// routes userControllers
router.route('/task')
.get(getAllTasks)
.post(addTask)

router.route('/task/:id')
.get(tasksFromSchedule)
.put(editTask)
.delete(deleteTask)

router.route('/task/comment/:id')
.post(addComment)
.put(editComment)
.put(deleteComment)

module.exports = router