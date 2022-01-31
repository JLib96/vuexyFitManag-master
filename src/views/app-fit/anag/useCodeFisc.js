// import { ref } from '@vue/composition-api'
// import store from '@/store'
// import personeDbManag from './persone/personeDbManag'

import CodiceFiscale from 'codice-fiscale-js'
// var CodiceFiscale = require('codice-fiscale-js');

export default function useCodeFisc() {
  const buildItalianCodFisc = itemData => {
    const name = itemData.value.nome
    if (!name) { return null }

    const surname = itemData.value.cognome
    if (!surname) { return null }

    const gender = itemData.value.sesso
    if (!gender) { return null }

    const birthplace = itemData.value.comune_nascita_label
    if (!birthplace) { return null }

    const birthDate = itemData.value.data_nascita
    if (!birthDate) { return null }
    const bdArr = birthDate.split('-')
    if (bdArr.length < 3) { return null }
    const day = parseInt(bdArr[2], 10)
    const month = parseInt(bdArr[1], 10)
    const year = parseInt(bdArr[0], 10)

    const cf = new CodiceFiscale({
      name,
      surname,
      gender, // M - F
      day,
      month,
      year,
      birthplace: itemData.value.localita_nascita,
      // birthplaceProvincia: "NA" // Optional
    })
    return cf
  }

  const msg1 = 'Impossibile verificare la correttezza del codice fiscale'
  const msg2 = 'Dati insufficienti per la compilazione del codice fiscale'
  const msg3 = 'Il Codice Fiscale non corrisponde ai dati anagrafici inseriti!'

  const checkItalianCodFisc = (itemData, cfToCheck) => {
    if (!itemData.value) { return msg1 }
    if (!cfToCheck) { return msg1 }
    const cf = buildItalianCodFisc(itemData)
    if (!cf) { return msg2 }
    return cf.cf === cfToCheck ? true : msg3
  }

  // CODICE FISCALE CITTADINI STRANIERI
  // var cf = new CodiceFiscale({
  //     name: "Enzo",
  //     surname: "Righi",
  //     gender: "M",
  //     day: 24,
  //     month: 7,
  //     year: 1957,
  //     birthplace: "Francia",
  //     birthplaceProvincia: "EE"
  // });

  return {
    buildItalianCodFisc,
    checkItalianCodFisc,
  }
}
