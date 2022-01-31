<template>
  <div>

    <!-- Header: Altre Informazioni -->
    <div class="d-flex">
      <feather-icon
        icon="MapPinIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        Altre Informazioni
      </h4>
    </div>

    <b-form>
      <!-- Form: Altre Informazioni -->
      <b-row class="mt-1">

        <!-- Field: Titolo di Studio -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Titolo di Studio"
            label-for="titolo_studio"
          >
            <v-select
              input-id="id"
              label="nome"
              :value="refTitStudio"
              :options="titoli_studio"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              class="w-100"
              @input="(val) => onTitStudioChanged(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Taglia -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Taglia"
            label-for="taglia"
          >
            <v-select
              input-id="id"
              label="internazionale"
              :value="refTaglia"
              :options="taglie"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              class="w-100"
              @input="(val) => onTagliaChanged(val)"
            />
          </b-form-group>

        </b-col>

        <!-- Field: Peso -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Peso"
            label-for="peso"
          >
            <b-form-input
              id="peso"
              v-model="itemData.peso"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Altezza -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Altezza"
            label-for="altezza"
          >
            <b-form-input
              id="altezza"
              v-model="itemData.altezza"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Targa 1 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Targa 1"
            label-for="targa1"
          >
            <b-form-input
              id="targa1"
              v-model="itemData.targa1"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Targa 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Targa 2"
            label-for="targa2"
          >
            <b-form-input
              id="targa2"
              v-model="itemData.targa2"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Header: Lingue Conosciute -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Lingue Conosciute
        </h4>
      </div>

      <!-- Form: Lingue Conosciute -->
      <b-row class="mt-1">

        <!-- Field: Langua 1 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Langua 1"
            label-for="lingue1"
          >
            <v-select
              input-id="id"
              label="nome"
              :value="refLang1"
              :options="lingue_parlate"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onLang1Changed(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Langua 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Langua 2"
            label-for="lingue2"
          >
            <v-select
              input-id="id"
              label="nome"
              :value="refLang2"
              :options="lingue_parlate"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onLang2Changed(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Langua 3 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Langua 3"
            label-for="lingue3"
          >
            <v-select
              input-id="id"
              label="nome"
              :value="refLang3"
              :options="lingue_parlate"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onLang3Changed(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Langua 4 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Langua 4"
            label-for="lingue4"
          >
            <v-select
              input-id="id"
              label="nome"
              :value="refLang4"
              :options="lingue_parlate"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onLang4Changed(val)"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Documento di Identità -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Documento di Identità
        </h4>
      </div>

      <!-- Form: Documento di Identità -->
      <b-row class="mt-1">

        <!-- Field: Tipo Documento -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Tipo Documento"
            label-for="tipo_doc"
          >
            <v-select
              input-id="id"
              label="nome"
              :value="refTipoDocIden"
              :options="tipi_docum_identita"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onTipoDocIdChange(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Numero Documento -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Numero"
            label-for="numero_doc"
          >
            <b-form-input
              id="numero_doc"
              v-model="itemData.numero_doc"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Data Documento -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Data Documento"
            label-for="data_doc"
          >
            <flat-pickr
              id="data_doc"
              v-model="itemData.data_doc"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d'}"
              placeholder="Seleziona una data..."
            />
          </b-form-group>
        </b-col>

        <!-- Field: Rilasciato Da -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Rilasciato Da"
            label-for="rilascio_doc"
          >
            <v-select
              input-id="id"
              label="nome"
              :value="refTipoDocRil"
              :options="tipi_docum_rilascio"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onTipoDocRilChange(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Regione Documento -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Regione"
            label-for="reg_doc"
          >
            <v-select
              input-id="codR"
              label="nomeR"
              :value="refRegione"
              :options="regioniProvList"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onRegChanged(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Provincia Documento -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Provincia"
            label-for="prov_doc"
          >
            <v-select
              input-id="codP"
              label="nomeP"
              :value="refProv"
              :options="provinceList"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onProvChanged(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Comune Documento -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Comune"
            label-for="comune_doc"
          >
            <v-select
              input-id="codC"
              label="nomeC"
              :value="refComune"
              :options="comuniList"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              @input="(val) => onComuneChanged(val)"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Note Documento -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Note"
            label-for="note_doc"
          >
            <b-form-input
              id="note_doc"
              v-model="itemData.note_doc"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Banca -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Banca
        </h4>
      </div>

      <b-row class="mt-1">

        <!-- Field: Banca -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Banca"
            label-for="banca"
          >
            <b-form-input
              id="banca"
              v-model="itemData.banca"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Indirizzo -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Indirizzo"
            label-for="indirizzo_banca"
          >
            <b-form-input
              id="indirizzo_banca"
              v-model="itemData.indirizzo_banca"
            />
          </b-form-group>
        </b-col>

        <!-- Field: IBAN -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="IBAN"
            label-for="iban"
          >
            <b-form-input
              id="iban"
              v-model="itemData.iban"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Banca 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Banca 2"
            label-for="banca_2"
          >
            <b-form-input
              id="banca_2"
              v-model="itemData.banca_2"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Indirizzo 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Indirizzo 2"
            label-for="indirizzo_banca_2"
          >
            <b-form-input
              id="indirizzo_banca_2"
              v-model="itemData.indirizzo_banca_2"
            />
          </b-form-group>
        </b-col>

        <!-- Field: IBAN 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="IBAN 2"
            label-for="iban_2"
          >
            <b-form-input
              id="iban_2"
              v-model="itemData.iban_2"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Form Actions -->
      <div class="d-flex mt-2">
        <b-button
          variant="primary"
          class="mr-2"
          @click="updateData"
        >
          Conferma
        </b-button>

      </div>
    </b-form>

  </div>
</template>

<script>
import {
  BButton, BRow, BCol, BFormGroup, BFormInput, BForm, BFormCheckbox,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import { ref, toRefs, onMounted } from '@vue/composition-api'

import useRegioniProvComuni from '../../useRegioniProvComuni'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormCheckbox,
    vSelect,
    flatPickr,
  },

  props: {
    isCreateNew: {
      type: Boolean,
      required: true,
    },
    itemData: {
      type: Object,
      required: true,
    },
    itemLookup: {
      type: Object,
      required: true,
    },
    preFilteredJsonLookup: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
    const { itemLookup, itemData, preFilteredJsonLookup } = toRefs(props)

    const mod = { id: '', nome: '' }
    const refLang1 = ref(mod)
    const refLang2 = ref(mod)
    const refLang3 = ref(mod)
    const refLang4 = ref(mod)
    const lingue_parlate = ref([])

    const refTitStudio = ref(mod)
    const titoli_studio = ref([])

    const refTaglia = ref({ id: 0, internazionale: '' })
    const taglie = ref([])

    const refTipoDocIden = ref({ id: '', nome: '' })
    const tipi_docum_identita = ref([])

    const refTipoDocRil = ref({ id: '', nome: '' })
    const tipi_docum_rilascio = ref([])

    // -------------- Regioni - Province - Comuni -----------------

    const setComuneDocDbValue = codC => {
      itemData.value.comune_doc = codC
    }

    const setProvDocDbValue = codP => {
      itemData.value.prov_doc = codP
    }

    const useRegProvCom = useRegioniProvComuni()
    useRegProvCom.refSetComuneDb.value = setComuneDocDbValue
    useRegProvCom.refSetProvDb.value = setProvDocDbValue

    const {
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
    } = useRegProvCom

    // -------------------------- END -------------------------------

    const fetchRefs = () => {
      lingue_parlate.value = itemLookup.value.lingue_parlate
      titoli_studio.value = itemLookup.value.titoli_studio
      taglie.value = itemLookup.value.taglie
      tipi_docum_identita.value = itemLookup.value.tipo_docum_identita
      tipi_docum_rilascio.value = itemLookup.value.tipo_docum_rilascio

      refLang1.value = lingue_parlate.value.find(l1 => l1.id === itemData.value.lingue1)
      refLang2.value = lingue_parlate.value.find(l2 => l2.id === itemData.value.lingue2)
      refLang3.value = lingue_parlate.value.find(l3 => l3.id === itemData.value.lingue3)
      refLang4.value = lingue_parlate.value.find(l4 => l4.id === itemData.value.lingue4)
      refTitStudio.value = titoli_studio.value.find(ts => ts.id === itemData.value.titolo_studio)
      refTaglia.value = taglie.value.find(tg => tg.id === itemData.value.taglia)

      refTipoDocIden.value = tipi_docum_identita.value.find(tdi => tdi.id === itemData.value.tipo_doc)
      refTipoDocRil.value = tipi_docum_rilascio.value.find(tdr => tdr.id === itemData.value.rilascio_doc)

      // -------------- Regioni - Province - Comuni -----------------
      const provComuniJsonStr = preFilteredJsonLookup.value ? preFilteredJsonLookup.value[1] : ''

      fetchRegioniProvince(itemData.value.comune_doc,
        itemData.value.prov_doc,
        provComuniJsonStr,
        itemLookup.value.istat_regioni_province)
      // -------------------------- END -----------------------------
    }

    onMounted(fetchRefs)

    const onLang1Changed = val => {
      if (!val) { return }
      itemData.value.lingue1 = val.id
      refLang1.value = val
    }

    const onLang2Changed = val => {
      if (!val) { return }
      itemData.value.lingue2 = val.id
      refLang2.value = val
    }

    const onLang3Changed = val => {
      if (!val) { return }
      itemData.value.lingue3 = val.id
      refLang3.value = val
    }

    const onLang4Changed = val => {
      if (!val) { return }
      itemData.value.lingue4 = val.id
      refLang4.value = val
    }

    const onTitStudioChanged = val => {
      if (!val) { return }
      itemData.value.titolo_studio = val.id
      refTitStudio.value = val
    }

    const onTagliaChanged = val => {
      if (!val) { return }
      itemData.value.taglia = val.id
      refTaglia.value = val
    }

    const onTipoDocIdChange = val => {
      if (!val) { return }
      itemData.value.tipo_doc = val.id
      refTipoDocIden.value = val
    }

    const onTipoDocRilChange = val => {
      if (!val) { return }
      itemData.value.rilascio_doc = val.id
      refTipoDocRil.value = val
    }

    const updateData = () => {
      emit('update-data')
    }

    return {
      updateData,

      lingue_parlate,
      titoli_studio,
      taglie,
      tipi_docum_identita,
      tipi_docum_rilascio,

      refLang1,
      refLang2,
      refLang3,
      refLang4,
      refTitStudio,
      refTaglia,
      refTipoDocIden,
      refTipoDocRil,

      onLang1Changed,
      onLang2Changed,
      onLang3Changed,
      onLang4Changed,
      onTitStudioChanged,
      onTagliaChanged,
      onTipoDocIdChange,
      onTipoDocRilChange,

      regioniProvList,
      provinceList,
      comuniList,
      onRegChanged,
      onProvChanged,
      onComuneChanged,
      refRegione,
      refProv,
      refComune,
    }
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
