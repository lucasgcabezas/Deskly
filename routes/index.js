const express = require('express')
const router = express.Router()

const scheduleControllers = require('../controllers/scheduleControllers')

const {getAllSchedule, getSchedule, getScheduleByBoard, addSchedule, putSchedule, deleteSchedule} = scheduleControllers

router.route('/schedule')
.get(getAllSchedule)
.post(addSchedule)

router.route('/schedule/:id')
.get(getSchedule)
.post(putSchedule)
.delete(deleteSchedule)

router.route('/scheduleByBoard/:id')
.get(getScheduleByBoard)
