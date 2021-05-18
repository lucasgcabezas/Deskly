require('dotenv').config()
const passport = require ("passport")
const express =  require('express')
const cors = require('cors')
const router = require('./routes/index')
require('./config/database')
const app = express()
require("./config/passport")

app.use(cors())
app.use(express.json())

app.use('/api',router)

const host=process.env.HOST || "0.0.0.0"
const port= process.env.PORT

app.listen(port, host, () => console.log('App listening on port 4000'))
