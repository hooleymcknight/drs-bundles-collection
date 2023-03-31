/**
 * takes in a number given by our json objects and spits it back out in currency format
 * @param {Number} rawPrice // these come in as number of cents, i.e. $43.12 will come in as 4312
 * @returns {String} string with currency $ and only two decimal points if needed
 */
const formatPrice = (rawPrice) => {
  let outPrice = rawPrice / 100
  if (rawPrice % 100 === 0) {
    outPrice = outPrice.toFixed(0)
  }
  else { // just in case there are cents
    outPrice = outPrice.toFixed(2)
  }
  return `$${outPrice}`
}

/**
 * checks if a string exists as a substring in any of the elements of an array
 * @param {String} string 
 * @param {Object} array 
 * @returns {Boolean} true if in the array, false if not
 */
const checkInArray = (string, array) => {
  for (let i=0; i < array.length; i++) {
    if (String(array[i]).includes(string)) {
      return true
    }
  }
  return false
}

/**
 * formats the titles of the included products so the duplicates get an x# instead of extra entries
 * @param {Object} included 
 * @returns {String} list of titles separated by commas, with "and" in the appropriate place
 */
const listIncludedProducts = (included) => {
  const titles = included.map(x => x.title)
  let newTitles = []

  // go through each of the original titles, and add them to a new array
  // if the title is already included, up the count in the new titles array
  for(let i=0; i < titles.length; i++) {
    if(!newTitles.length || !checkInArray(titles[i], newTitles)) {
      newTitles.push(titles[i])
    }
    else {
      let relevantIndex = newTitles.findIndex(x => x.includes(titles[i]))
      let currentTitle = newTitles[relevantIndex]
      if (!currentTitle.includes(' x ')) {
        newTitles[relevantIndex] += ' x 2'
      }
      else {
        let count = Number(currentTitle.charAt(currentTitle.length - 1))
        newTitles[relevantIndex] = newTitles[relevantIndex].replace(` x ${count}`, ` x ${count + 1}`)
      }
    }
  }

  // join the titles together
  let titlesList = newTitles.join(', ')
  // find the last instance of a comma
  const breakIndex = titlesList.lastIndexOf(',') + 1
  // break there and insert in the and
  return titlesList.substring(0, breakIndex - 1) + ', and' + titlesList.substring(breakIndex, titlesList.length)
}

/**
 * gets the prices for each individual part of the bundle and adds them up
 * @param {Object} included 
 * @returns {Number} total
 */
const getTotalCost = (included) => {
  const prices = included.map(x => x.price)
  let total = 0
  for (let i=0; i < prices.length; i++) {
    total += prices[i]
  }
  return total
}

const orderOfTags = ['woodsy', 'citrus', 'rich', 'spiced', 'herbal', 'fresh']

/**
 * takes the tags in the included products, smashes em all together into one array, and then orders them based on the above
 * @param {Object} included 
 * @returns 
 */
const getTags = (included) => {
  const allTags = included.map(x => x['scent_profile']).flat(1)
  const newTags = [...new Set(allTags)]
  newTags.sort((a, b) => orderOfTags.indexOf(a) - orderOfTags.indexOf(b))
  return newTags
}

export { formatPrice, listIncludedProducts, getTotalCost, getTags }