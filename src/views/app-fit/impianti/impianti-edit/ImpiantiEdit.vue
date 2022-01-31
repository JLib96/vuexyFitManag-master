<template>
  <component :is="itemData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="itemData === undefined"
    >
      <h4 class="alert-heading">
        Errore durante il recupero dei dati
      </h4>
      <div class="alert-body">
        Nessun elemento trovato con questo id. Controlla
        <b-link
          class="alert-link"
          :to="{ name: 'app-fit-anag-persone-list'}"
        >
          Lista Persone
        </b-link>
        per altre Persone.
      </div>
    </b-alert>

    <b-tabs
      v-if="itemData"
      pills
    >

      <!-- Tab: Information -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Anagrafica</span>
        </template>
        <persone-edit-tab-anagrafica
          :item-data.sync="itemData"
          :item-lookup="itemLookup"
          :pre-filtered-json-lookup="preFilteredJsonLookup"
          :is-create-new="isCreateNew"
          class="mt-2 pt-75"
          @update-data="updateData"
        />
      </b-tab>

      <!-- Tab: Account -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Altre Informazioni</span>
        </template>
        <persone-edit-tab-formazione
          :item-data.sync="itemData"
          :item-lookup="itemLookup"
          :pre-filtered-json-lookup="preFilteredJsonLookup"
          :is-create-new="isCreateNew"
          class="mt-2 pt-75"
          @update-data="updateData"
        />
      </b-tab>

    </b-tabs>

    <!-- Action Buttons -->
    <!-- <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      @click="updateData"
    >
      Conferma
    </b-button> -->

    <div style="color: red; margin-top: 7px">
      {{ errorMsg }}
    </div>

  </component>

</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink, BButton,
} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import personeDbManag from '../personeDbManag'
import PersoneEditTabAnagrafica from './PersoneEditTabAnagrafica.vue'
import PersoneEditTabFormazione from './PersoneEditTabFormazione.vue'

import useCodeFisc from '../../useCodeFisc'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BButton,

    PersoneEditTabAnagrafica,
    PersoneEditTabFormazione,
  },
  setup() {
    const itemData = ref(null)
    const itemLookup = ref(null)
    const preFilteredJsonLookup = ref([])
    const isCreateNew = ref(false)
    const errorMsg = ref('')

    const APP_STORE_MODULE_NAME = 'anag-persone'

    const regModule = () => {
      // Register module
      if (!store.hasModule(APP_STORE_MODULE_NAME)) { store.registerModule(APP_STORE_MODULE_NAME, personeDbManag) }
    }

    const unregModule = () => {
      // UnRegister module
      if (store.hasModule(APP_STORE_MODULE_NAME)) store.unregisterModule(APP_STORE_MODULE_NAME)
    }

    const handleError = error => {
      if (error.response) {
        if (error.response.data) {
          errorMsg.value = JSON.stringify(error.response.data)
        }
      } else if (error.message) {
        errorMsg.value = JSON.stringify(error.message)
      } else {
        errorMsg.value = 'Errore inaspettato, prova a ricaricare la pagina'
      }
    }

    regModule()

    // UnRegister on leave
    onUnmounted(() => {
      unregModule()
      // if (store.hasModule(APP_STORE_MODULE_NAME)) store.unregisterModule(APP_STORE_MODULE_NAME)
    })

    // ---------------------------- LOAD DATA --------------------------------
    const loadPersona = () => {
      store.dispatch('anag-persone/fetchPersona', { id: router.currentRoute.params.id })
        .then(response => {
          if (response.data) {
            preFilteredJsonLookup.value = response.data.preFilteredJsonLookup
            const sItemData = response.data.jsonResult
            const sItemLookup = response.data.jsonLookup
            if (sItemData && sItemLookup) {
              itemData.value = JSON.parse(sItemData)
              itemLookup.value = JSON.parse(sItemLookup)
            }
          }
        }).catch(error => { handleError(error) })
    }

    const blankItemData = {
      // ---- MANDATARY -----
      id: -1,
      nome: null,
      cognome: null,
      cod_fisc: null,
      email: null,
      data_nascita: null, // Date
      comune_nascita: null,
      sesso: null, // char
      tipo_nascita: 1, // Tinyint   0=Estero 1=Italia
      stato_nascita: null, // Int
      localita_nascita: null, // NVarChar
      prov_residenza: null, // Int
      comune_residenza: null, // Int
      localita_residenza: null, // NVarChar
      indirizzo_residenza: null, // NVarChar
      cap_residenza: null, // NVarChar

      // ---- NOT MANDATARY -----
      // straniero: null,           //Tinyint
      disabile: null, // Bit
      telefono: null, // NVarChar
      telefono2: null, // NVarChar
      fax: null, // NVarChar
      mobile: null, // NVarChar
      mobile_int: null, // NVarChar
      email_pec: null, // NVarChar

      banca: null, // NVarChar
      indirizzo_banca: null, // NVarChar
      iban: null, // NVarChar
      banca_2: null, // NVarChar
      indirizzo_banca_2: null, // NVarChar
      iban_2: null, // NVarChar
      skype: null, // NVarChar
      titolo_studio: null, // Char
      lingue1: null, // Char
      lingue2: null, // Char
      lingue3: null, // Char
      lingue4: null, // Char
      taglia: null, // TinyInt
      targa1: null, // NVarChar
      targa2: null, // NVarChar
      tipo_doc: null, // NVarChar
      comune_doc: null, // Int
      prov_doc: null, // Int
      rilascio_doc: null, // NVarChar
      numero_doc: null, // NVarChar

      data_doc: null, // Date
      note_doc: null, // NVarChar
      peso: null, // NVarChar
      altezza: null, // NVarChar
      nazione_residenza: null, // NVarChar  => Da cambiare in Int
      cittadinanza: null, // Int
      cittadinanza_sportiva: null, // Int

      deceduto: null, // Bit

      privacy1: false, // Bit
      privacy2: false, // Bit
      privacy3: false, // Bit
      privacy4: false, // Bit
    }

    const loadForNew = () => {
      store.dispatch('anag-persone/fetchLookUp')
        .then(response => {
          if (response.data) {
            itemLookup.value = response.data
            itemData.value = JSON.parse(JSON.stringify(blankItemData))
            preFilteredJsonLookup.value = new Array(2)
            preFilteredJsonLookup.value[0] = ''
            preFilteredJsonLookup.value[1] = ''
          }
        }).catch(error => { handleError(error) })
    }

    if (router.currentRoute.path.endsWith('new')) {
      isCreateNew.value = true
      loadForNew()
    } else {
      isCreateNew.value = false
      loadPersona()
    }

    // ---------------------------- END LOAD DATA --------------------------------

    // ---------------------------- UPDATE DATA --------------------------------

    const {
      checkItalianCodFisc,
    } = useCodeFisc()

    const launchStore = path => {
      const result = checkItalianCodFisc(itemData, itemData.value.cod_fisc)
      if (result !== true) {
        errorMsg.value = result
      } else {
        errorMsg.value = ''
        regModule()
        store.dispatch(path, itemData.value)
          .then(response => {
            if (response.data) {
              if (isCreateNew.value === true) {
                isCreateNew.value = false
                if (response.data.id) {
                  itemData.value.id = response.data.id
                }
              }
              errorMsg.value = ''
            }
          }).catch(error => { handleError(error) }).finally(() => { unregModule() })
      }
    }

    const addPersona = () => {
      launchStore('anag-persone/addPersona')
    }

    const updatePersona = () => {
      launchStore('anag-persone/updatePersona')
    }

    const checkPrivacy = () => {
      if (itemData.value.privacy1 === true
            && itemData.value.privacy2 === true
            && itemData.value.privacy3 === true) {
        errorMsg.value = ''
        return true
      }
      errorMsg.value = 'I campi  "Privacy 1",  "Privacy 2",  "Privacy 3"  sono obbligatori!'
      return false
    }

    const updateData = () => {
      try {
        if (isCreateNew.value === true) {
          if (checkPrivacy()) {
            addPersona()
          }
        } else {
          updatePersona()
        }
      } catch (err) {
        handleError(err)
      }
    }

    // ---------------------------- END UPDATE DATA --------------------------------

    return {
      itemData,
      itemLookup,
      preFilteredJsonLookup,
      isCreateNew,
      errorMsg,

      updateData,
    }
  },

}
</script>

<style>

</style>
