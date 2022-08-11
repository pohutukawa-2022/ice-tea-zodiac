let day = 8
let month = 5
let year = 1983

function findWesternZodiac(day, month) {

  const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
  const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
  let monthInput = month - 1;

  if (monthInput == 0 && day <= 20) {
    monthInput = 11;
  } else if (day < days[month]) {
    monthInput--;
  };
  return signs[monthInput];
};

function getEasternZodiac(year) {

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
    'Pig'
  ]

  const ind = year % 12
  let name
  if (ind > 3) {
    name = years[ind - 4]
  } else {
    name = years[ind + 8]
  }
  if (!name) throw new Error(`Opps, error`)
  return name
}


console.log(findWesternZodiac(day, month))
console.log(getEasternZodiac(year))
