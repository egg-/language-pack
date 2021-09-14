/* globals it describe */

'use strict'

const path = require('path')

const LanguagePack = require('../lib')

describe('language-pack', () => {
  const config = require('../config.json')
  const languagePack = new LanguagePack(path.join(__dirname, '../', config.keyFile))

  it('auth', async () => {
    await languagePack.auth()
  })

  it('load language pack', async () => {
    const result = await languagePack.load(config.spreadsheetId, config.worksheetTitle, config.targetLanguages)
    console.log(result)
  })
})
