import { ref } from '@vue/composition-api'
import store from '@/store'
import personeDbManag from './persone/personeDbManag'

export default function useRegioniProvComuni() {
  const APP_STORE_MODULE_NAME = 'anag-persone'

  const regioniProvList = ref([])
  const provinceList = ref([])
  const comuniList = ref([])

  // const comuni_nascita = ref([{id: 0, comune:''}])

  const refRegione = ref({ codR: 0, nomeR: '', Province: [] })
  const emptyProv = { codP: 0, nomeP: '' }
  const refProv = ref(emptyProv)
  const emptyComune = { codC: 0, nomeC: '' }
  const refComune = ref(emptyComune)

  const refSetComuneDb = ref(codC => {})
  const refSetProvDb = ref(codP => {})

  const regModule = () => {
    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME)) store.registerModule(APP_STORE_MODULE_NAME, personeDbManag)
  }

  const unregModule = () => {
    // UnRegister module
    if (store.hasModule(APP_STORE_MODULE_NAME)) store.unregisterModule(APP_STORE_MODULE_NAME)
  }

  const fetchRegioniProvince = (codC, codP, provComJson, regProvList) => {
    regioniProvList.value = regProvList
    fetchRegProv(codP)
    setComuniByProv(codC, provComJson)
  }

  const fetchRegProv = codP => {
    regioniProvList.value.forEach(reg => {
      getRegsProvs(codP, reg)
    })
  }

  const getRegsProvs = (codP, reg) => {
    const prov = reg.Province.find(p => p.codP === codP)
    if (prov) {
      refRegione.value = reg
      refProv.value = prov
      provinceList.value = reg.Province
    }
  }

  const onRegChanged = reg => {
    if (!reg) { return }
    refRegione.value = reg
    setProvinceValues(null, null, reg.Province)
    setComuniValues(null, null, [])
  }

  const onProvChanged = prov => {
    if (!prov) { return }
    setProvincia(prov.codP, prov)
    setComune(null, null)
    fetchComuniByProv(prov, null)
  }

  const onComuneChanged = com => {
    if (!com) { return }
    setComune(com.codC, com)
  }

  const fetchComuniByProv = (prov, com) => {
    if (!prov) { return }
    regModule()
    store.dispatch('anag-persone/fetchComuni', { iProv: prov.codP })
      .then(response => {
        setComuniByProv(com, response.data)
      }).catch(error => {
        if (error.response.status === 404) {
          comuniList.value = null
        }
      }).finally(() => { unregModule() })
  }

  const setComuniByProv = (codC, jsonStr) => {
    if (jsonStr) {
      const jsonComuni = JSON.parse(jsonStr)
      if (typeof (jsonComuni.istat_comuni) !== 'undefined') {
        comuniList.value = jsonComuni.istat_comuni
        if (codC) {
          refComune.value = comuniList.value.find(c => c.codC === codC)
        } else {
          refComune.value = null // emptyComune
        }
      } else {
        removeVSelectComuni()
      }
    } else {
      removeVSelectComuni()
    }
  }

  const removeVSelectComuni = () => {
    refComune.value = emptyComune
    comuniList.value = []
  }

  const setComuniValues = (codC, comuneRef, comList) => {
    comuniList.value = comList
    setComune(codC, comuneRef)
  }

  const setComune = (codC, comuneRef) => {
    if (refSetComuneDb.value) {
      refSetComuneDb.value(codC)
    }
    refComune.value = comuneRef
  }

  const setProvinceValues = (codP, provRef, provList) => {
    provinceList.value = provList
    setProvincia(codP, provRef)
  }

  const setProvincia = (codP, provRef) => {
    if (refSetProvDb.value) {
      refSetProvDb.value(codP)
    }
    refProv.value = provRef
  }

  // ------------------------- COMUNI NASCITA ----------------------------

  // const fetchComuniNascita = (search, loading) => {
  //     regModule()
  //     if(search.length) {
  //         loading(true)
  //         fetchDebuonce(loading, search)
  //     }
  // }

  // const fetchDebuonce = (loading, search) => { return debounce(fetchData(loading, search), 350) }

  // const fetchData = (loading, search) => {
  //     store.dispatch('anag-persone/fetchComuniNascita', { search: search, maxNum: 25 })
  //     .then(response => {
  //         loading(false)
  //         if (response.data) {
  //             // console.debug(response.data)
  //             const json = JSON.parse(response.data)
  //             comuni_nascita.value = json.comuni_nascita
  //         }
  //     }).catch(error => {
  //         if (error.response.status === 404) {}
  //     }).finally(() => { unregModule() })
  // }

  // const debounce = (fn, delay) => {
  //     let timeout
  //     return (...args) => {
  //       if (timeout) {
  //         clearTimeout(timeout)
  //       }

  //       timeout = setTimeout(() => {
  //         fn(...args)
  //       }, delay)
  //     }
  // }

  return {
    // fetchComuniNascita,
    // comuni_nascita,
    fetchRegioniProvince,
    regioniProvList,
    provinceList,
    comuniList,
    onRegChanged,
    onProvChanged,
    onComuneChanged,
    refRegione,
    refProv,
    refComune,
    refSetComuneDb,
    refSetProvDb,
  }
}
