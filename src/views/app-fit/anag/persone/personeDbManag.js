const dbManag = require('../../../../dbManag')

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchPersone(ctx, queryParams) {
      const url = 'Persone/getList'
      return new Promise((resolve, reject) => {
        dbManag
          .post(url, queryParams)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchPersona(ctx, { id }) {
      const url = `Persone/read/${id}`
      return new Promise((resolve, reject) => {
        dbManag
          .get(url)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addPersona(ctx, dataObj) {
      const url = 'Persone/create'
      return new Promise((resolve, reject) => {
        dbManag
          .post(url, dataObj)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updatePersona(ctx, dataObj) {
      const url = 'Persone/update'
      return new Promise((resolve, reject) => {
        dbManag
          .post(url, dataObj,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchComuni(ctx, { iProv }) {
      const url = `Resources/getComuni/${iProv}`
      return new Promise((resolve, reject) => {
        dbManag
          .get(url)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchLookUp(ctx) {
      const url = 'Persone/lookUp'
      return new Promise((resolve, reject) => {
        dbManag
          .get(url)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchComuniNascita(ctx, { search, maxNum }) {
      const url = `Resources/getComuniNascita/${search}/${maxNum}`
      return new Promise((resolve, reject) => {
        dbManag
          .get(url)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

  },
}
