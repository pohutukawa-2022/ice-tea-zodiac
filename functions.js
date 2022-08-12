const fs = require('fs').promises
const { doesNotMatch } = require('assert')
const path = require('path')

// This function returns western zodiac from day and month

function findWesternZodiac(day, month) {
  const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22]
  const signs = [
    'Aquarius',
    'Pisces',
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
  ]
  let monthInput = month - 1

  if (monthInput == 0 && day <= 20) {
    monthInput = 11
  } else if (day < days[month]) {
    monthInput--
  }
  return signs[monthInput]
}

// This function returns easternZodiac from year

function findEasternZodiac(year) {
  const years = [
    'Rat',
    'Ox',
    'Tiger',
    'Rabbit',
    'Dragon',
    'Snake',
    'Horse',
    'Sheep',
    'Monkey',
    'Rooster',
    'Dog',
    'Pig',
  ]

  const ind = year % 12
  let easternZodiac
  if (ind > 3) {
    easternZodiac = years[ind - 4]
  } else {
    easternZodiac = years[ind + 8]
  }
  if (!easternZodiac) throw new Error(`Opps, error`)
  return easternZodiac
}

// This function returns primal Zodiac from western & eastern zodiac based one primalZodiac.JSON

async function getPrimalZodiac(westernZodiac, easternZodiac) {

  const dataPath = path.join(__dirname, '/public/data/data.json')
  const zodiacContents = await fs.readFile(dataPath, 'utf-8')
  const zodiacMetaData = await JSON.parse(zodiacContents)
  const zodiacData = zodiacMetaData.zodiacMeta

  let zodiacDataFocus = zodiacData.find(
    (e) => e.westernZodiac == westernZodiac && e.easternZodiac == easternZodiac
  )

  let primalZodiac = zodiacDataFocus.primalZodiac
  console.log(primalZodiac)
}

let day = 8

let month = 5
let year = 1983

console.log(findWesternZodiac(day, month))
console.log(findEasternZodiac(year))
getPrimalZodiac('Taurus', 'Pig')

module.exports = {
  findWesternZodiac,
  findEasternZodiac,
  getPrimalZodiac,
}
// expected output: 12
