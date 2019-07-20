const express = require('express')
const app = express()

const path = require('path')
const request = require('request')
const reqPromise = require('request-promise')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')


// app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use( '/', api )

mongoose.connect('mongodb://localhost/mezegDB', { useNewUrlParser: true })


const port = 7000
app.listen(port, () =>
    console.log(`Node server port ${port}`))


module.exports = {app}