const express = require('express')
const server = express()
const hbs = require('express-handlebars')
const fs = require('fs').promises
const path = require('path')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

const mainRoute = require('./routes')
server.use('/primalZodiac', mainRoute)

// Our main home route should go here

server.get('/', async (req, res) => {
  res.send('testing testing')
})

module.exports = server
