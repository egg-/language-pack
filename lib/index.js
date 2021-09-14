const { google } = require('googleapis')

const spreadsheets = google.sheets('v4').spreadsheets

const columnToLetter = (column) => {
  let temp
  let letter = ''
  while (column > 0) {
    temp = (column - 1) % 26
    letter = String.fromCharCode(temp + 65) + letter
    column = (column - temp - 1) / 26
  }
  return letter
}

module.exports = class {
  /**
   * constructor
   * @param {string} keyFile credentials file path
   */
  constructor (keyFile) {
    this.keyFile = keyFile
    this.authClient = null
  }

  async auth () {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    this.authClient = await auth.getClient()
  }

  /**
   * load language pack
   * @param {string} spreadsheetId spreadsheet id
   * @param {string} worksheetTitle title of worksheet to load
   * @param {string[]} targetLanguages language list
   * @return {object}
   */
  async load (spreadsheetId, worksheetTitle, targetLanguages) {
    if (this.authClient === null) {
      this.authClient = await this.auth()
    }

    const response = await spreadsheets.get({
      auth: this.authClient,
      spreadsheetId: spreadsheetId,
      ranges: [],
      includeGridData: false
    })

    const sheet = response.data.sheets.find(s => s.properties.title === worksheetTitle)

    const values = await spreadsheets.values.get({
      auth: this.authClient,
      spreadsheetId: spreadsheetId,
      range: `${worksheetTitle}!${columnToLetter(1)}1:${columnToLetter(sheet.properties.gridProperties.columnCount)}${sheet.properties.gridProperties.rowCount}`,
      valueRenderOption: 'UNFORMATTED_VALUE'
    })

    // init
    const result = {}
    targetLanguages.forEach((lang) => {
      result[lang] = {}
    })

    for (let i = 1; i < values.data.values.length; i++) {
      const row = values.data.values[i]
      if (!row[0] || ![row[1]]) {
        break
      }

      const category = row[0]
      targetLanguages.forEach((lang, idx) => {
        result[lang][category] = result[lang][category] || {}
        result[lang][category][row[1]] = row[idx + 2]
      })
    }

    return result
  }
}
