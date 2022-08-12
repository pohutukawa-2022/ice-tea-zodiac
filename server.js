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

// const mainRoute = require('./routes')
// server.use('/primalZodiac', mainRoute)

// Our main home route should go here

server.get('/', async (req, res) => {
  res.render('home')
})

server.get('/result/:id', async (req, res) => {
  const dataPath = path.join(__dirname, '/public/data/data.json')
  const contents = await fs.readFile(dataPath, `utf-8`)

  const data = JSON.parse(contents)

  const input = req.body
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
  console.log(whichZodiac)
  const viewData = {
    whichZodiac: whichZodiac,
    imgPath: imgPath,
    description,
  }

  res.render('imgdesc', viewData)
})
server.post('/', async (req, res) => {
  const dataPath = path.join(__dirname, '/public/data/data.json')
  // console.log(dataPath)
  const contents = await fs.readFile(dataPath, `utf-8`)
  // console.log(contents)
  const data = JSON.parse(contents)
  // console.log(data)
  const input = req.body
  // console.log(input)
  // console.log(input.year)
  const zodiac = data.zodiacMeta

  const starSign = functions.findWesternZodiac(input.month, input.day)
  const animalYear = functions.findEasternZodiac(input.year)
  // console.log(starSign)
  // console.log(animalYear)
  const primal = await functions.getPrimalZodiac(starSign, animalYear)
  // const whichZodiac = primal.primalZodiac
  // console.log(whichZodiac)
  // const whichImage = primal.imagePath
  // console.log(whichImage)
  // const whichDesc = primal.descPath
  // console.log(whichDesc)
  res.redirect(`/result/${primal.id}`)
  // const whichZodiac = zodiac.find((x) => x.name === `${primal}`)
  // console.log(whichZodiac)

  // console.log(zodiac)
})

module.exports = server
