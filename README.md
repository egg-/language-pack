# language-pack

[![version](https://img.shields.io/npm/v/language-pack.svg)](https://www.npmjs.com/package/language-pack) [![download](https://img.shields.io/npm/dm/language-pack.svg)](https://www.npmjs.com/package/language-pack)
[![status status](https://travis-ci.com/egg-/language-pack.svg?branch=main)](https://travis-ci.com/egg-/language-pack)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
## Usage

```javascript
const LanguagePack = require('language-pack')
const config = require('../config.json')

const languagePack = new LanguagePack(path.join(__dirname, '../', config.keyFile))

const result = await languagePack.load(config.spreadsheetId, config.worksheetTitle, config.targetLanguages)
```

## License

atome is licensed under the [MIT license](https://github.com/egg-/language-pack/blob/main/LICENSE).