const express = require('express')
const server = express()
const hbs = require('express-handlebars')
const fs = require('fs').promises
const path = require('path')
const functions = require('./functions')
// console.log(functions)

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.set('view engine', 'hbs')
server.engine('hbs', hbs.engine({ extname: 'hbs' }))


// Our main home route should go here

server.get('/', async (req, res) => {
  res.render('home')
})

server.get('/result/:id', async (req, res) => {

  const dataPath = path.join(__dirname, '/public/data/data.json')
  const namePath = path.join(__dirname, '/public/data/nameData.json')
  const nameStr = await fs.readFile(namePath, `utf-8`)
  const contents = await fs.readFile(dataPath, `utf-8`)
  const name = JSON.parse(nameStr)
  const data = JSON.parse(contents)


  const input = req.body
  console.log(input)
  const zodiac = data.zodiacMeta
  const starSign = functions.findWesternZodiac(input.month, input.day)
  const animalYear = functions.findEasternZodiac(input.year)
  const primal = await functions.getPrimalZodiac(starSign, animalYear)
  const id = req.params.id

  let whichZodiac = zodiac.find((x) => x.id == id)
  const imgPath = whichZodiac.imagePath
  const description = await fs.readFile(
    path.join(__dirname, `public`, whichZodiac.descPath),
    `utf-8`
  )
const primalZodiac = whichZodiac.primalZodiac

  const viewData = {
    whichZodiac: whichZodiac,
    imgPath: imgPath,
    description,
    name,
    primalZodiac
  }

  res.render('imgdesc', viewData)
})

server.post('/', async (req, res) => {

  const dataPath = path.join(__dirname, '/public/data/data.json')
  const contents = await fs.readFile(dataPath, `utf-8`)
  const data = JSON.parse(contents)
  const input = req.body

  const nameData = JSON.stringify(input.name)
  const namePath = path.join(__dirname, '/public/data/nameData.json')
 await fs.writeFile(namePath, nameData, 'utf-8')

  const starSign = functions.findWesternZodiac(input.month, input.day)
  const animalYear = functions.findEasternZodiac(input.year)
  const primal = await functions.getPrimalZodiac(starSign, animalYear)

  res.redirect(`/result/${primal.id}`)
})

module.exports = server
