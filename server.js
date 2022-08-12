const express = require('express')
const server = express()
const hbs = require('express-handlebars')
const fs = require('fs').promises
const path = require('path')
const functions = require('./functions')
console.log(functions)

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.set('view engine', 'hbs')
server.engine('hbs', hbs.engine({ extname: 'hbs' }))

// const mainRoute = require('./routes')
// server.use('/primalZodiac', mainRoute)

// Our main home route should go here

server.get('/', async (req, res) => {
  res.render('home')
})

server.post('/:id', async (req, res) => {
  const dataPath = path.join(__dirname, 'data.json')
  const contents = await fs.readFile(dataPath, `utf-8`)
  const data = JSON.parse(contents)
  console.log(data)
  const zodiac = data.zodiacMeta
})

module.exports = server
