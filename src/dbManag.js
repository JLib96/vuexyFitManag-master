const axios = require('axios')

const dbManag = axios.create({
  baseURL: 'https://mgmt-test-service-app.azurewebsites.net/',
  /* other custom settings */
})

module.exports = dbManag
