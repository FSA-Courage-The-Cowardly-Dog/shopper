const express = require('express')
const path = require('path')
const cors = require('cors')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const app = express()

//static middleware
app.use(express.static(path.join(__dirname,'..','public')))
app.use(cors())
app.use(volleyball)

app.use(express.json())
// app.use('/api', require('./api'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app;