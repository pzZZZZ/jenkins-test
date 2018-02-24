'use strict'
let env = null
if (process.env.NODE_ENV == '233') {
  env = '233';
} else if (process.env.NODE_ENV == '226') {
  env = '226';
} else {
  env = 'production';
}
module.exports = {
  NODE_ENV: `"${process.env.NODE_ENV}"`
}
