const dbManag = require('../../../../dbManag')

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchSocieties(ctx, queryParams) {
      const url = 'Societies/getFilteredListView'
      return new Promise((resolve, reject) => {
        dbManag
          .post(url, queryParams)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchSociety(ctx, { id }) {
      const url = `Societies/getDetailsView/${id}`
      return new Promise((resolve, reject) => {
        dbManag
          .get(url)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addSociety(ctx, societyData) {
      societyData.legalRapp = 3
      societyData.legaNature = 5
      societyData.localityPostal = societyData.localityLegal
      societyData.provincePostal = societyData.provinceLegal
      societyData.addressPostal = societyData.addressLegal
      societyData.capPostal = societyData.capLegal
      societyData.affiliationCode = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
      const url = 'Societies/create'
      return new Promise((resolve, reject) => {
        dbManag
          .post(url, societyData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

  },
}
