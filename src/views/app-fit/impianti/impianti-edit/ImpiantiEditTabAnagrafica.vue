<template>
  <div>

    <!-- Header: Dati Anagrafici -->
    <div class="d-flex">
      <feather-icon
        icon="UserIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        Dati Anagrafici
      </h4>
    </div>

    <validation-observer
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <!-- Form: Dati Anagrafici + Nascita Info + Residenza -->
      <b-form
        class="mt-1"
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
        <b-row>

          <!-- Field: Nome -->
          <b-col
            cols="12"
            md="4"
          >
            <validation-provider
              #default="validationContext"
              name="Nome"
              rules="required"
            >
              <b-form-group
                label="Nome"
                label-for="nome"
              >
                <b-form-input
                  id="nome"
                  v-model="itemData.nome"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Cognome -->
          <b-col
            cols="12"
            md="4"
          >
            <validation-provider
              #default="validationContext"
              name="Cognome"
              rules="required"
            >
              <b-form-group
                label="Cognome"
                label-for="cognome"
              >
                <b-form-input
                  id="cognome"
                  v-model="itemData.cognome"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Cod. Fisca -->
          <b-col
            cols="12"
            md="4"
          >
            <validation-provider
              #default="validationContext"
              name="Cod. Fiscale"
              rules="required|alpha-num"
            >
              <b-form-group
                label="Cod. Fiscale"
                label-for="cod_fisc"
              >
                <b-form-input
                  id="cod_fisc"
                  v-model="itemData.cod_fisc"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Email -->
          <b-col
            cols="12"
            md="4"
          >
            <validation-provider
              #default="validationContext"
              name="Email"
              rules="required|email"
            >
              <b-form-group
                label="Email"
                label-for="email"
              >
                <b-form-input
                  id="email"
                  v-model="itemData.email"
                  type="email"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: PEC -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="PEC"
              label-for="email_pec"
            >
              <b-form-input
                id="email_pec"
                v-model="itemData.email_pec"
                type="email"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Data di Nascita -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <validation-provider
              #default="validationContext"
              name="Data di Nascita"
              rules="required"
            >
              <b-form-group
                label="Data di Nascita"
                label-for="data_nascita"
                :state="getValidationState(validationContext)"
              >
                <flat-pickr
                  id="data_nascita"
                  v-model="itemData.data_nascita"
                  class="form-control"
                  :config="{ dateFormat: 'Y-m-d'}"
                  placeholder="Seleziona una data..."
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Sesso -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <validation-provider
              #default="validationContext"
              name="Sesso"
              rules="required"
            >
              <b-form-group
                label="Sesso"
                label-for="sesso"
                :state="getValidationState(validationContext)"
              >
                <v-select
                  id="sesso"
                  v-model="itemData.sesso"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="refGenderOptions"
                  :clearable="false"
                />
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Cod. Skype -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Skype"
              label-for="skype"
            >
              <b-form-input
                id="skype"
                v-model="itemData.skype"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Matricola -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Matricola"
              label-for="matricola"
            >
              <b-form-input
                id="matricola"
                v-model="itemData.matricola"
                type="number"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Cittadinanza -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Cittadinanza"
              label-for="cittadinanza"
            >
              <v-select
                input-id="id"
                :value="refCittadinanza"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="stati_cittad"
                :clearable="false"
                label="stato"
                @input="(val) => onCittadChanged(val)"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Cittadinanza Sportiva -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Cittadinanza Sportiva"
              label-for="cittadinanza_sportiva"
            >
              <v-select
                input-id="id"
                :value="refCittadSportiva"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="stati_cittad"
                :clearable="false"
                label="stato"
                @input="(val) => onCittadSportChanged(val)"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Disabile -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Disabile"
              label-for="disabile"
            >
              <b-form-checkbox
                id="disabile"
                :checked="itemData.disabile"
                switch
              />
            </b-form-group>
          </b-col>

          <!-- Field: Deceduto -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Deceduto"
              label-for="deceduto"
            >
              <b-form-checkbox
                id="deceduto"
                :checked="itemData.deceduto"
                switch
              />
            </b-form-group>
          </b-col>

        </b-row>

        <!-- Header: Luogo di Nascita -->
        <div class="d-flex mt-2">
          <feather-icon
            icon="MapPinIcon"
            size="19"
          />
          <h4 class="mb-0 ml-50">
            Luogo di Nascita
          </h4>
        </div>

        <!-- Form: Luogo di Nascita -->
        <b-row class="mt-1">

          <!-- Field: Stato di Nascita -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Stato"
              label-for="stato_nascita"
            >
              <v-select
                input-id="id"
                :value="refStatoNascita"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="stati_nascita"
                :clearable="false"
                label="denominazione"
                @input="(val) => onStatoNascitaChanged(val)"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Comune di Nascita -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <validation-provider
              #default="validationContext"
              name="Comune di Nascita"
              rules="required"
            >
              <b-form-group
                label="Comune"
                label-for="comune_nascita"
                :state="getValidationState(validationContext)"
              >
                <v-search-select
                  :id-ref.sync="itemData.comune_nascita"
                  :text-on-load.sync="itemData.comune_nascita_label"
                  input-id="id"
                  label="comune"
                  options-json-node="comuni_nascita"
                  max-items-num="25"
                  module-name="anag-persone"
                  :ref-module="personeDbManag"
                  search-method="fetchComuniNascita"
                />
                <!-- <v-select
                  input-id="id"
                  label="comune"
                  :value="refComuneNascita"
                  :options="comuni_nascita"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :clearable="false"
                  @search="fetchComuniNascita"
                /> -->
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Localita di Nascita -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Localita di Nascita"
              label-for="localita_nascita"
            >
              <b-form-input
                id="localita_nascita"
                v-model="itemData.localita_nascita"
              />
            </b-form-group>
          </b-col>

        </b-row>

        <!-- Header: Residenza -->
        <div class="d-flex mt-2">
          <feather-icon
            icon="MapPinIcon"
            size="19"
          />
          <h4 class="mb-0 ml-50">
            Residenza
          </h4>
        </div>

        <!-- Form: RESIDENZA -->
        <b-row class="mt-1">

          <!-- Field: Nazione -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Nazione"
              label-for="nazione_residenza"
            >
              <b-form-input
                id="nazione_residenza"
                v-model="itemData.nazione_residenza"
                placeholder="Nazione"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Regione di Residenza -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Regione"
              label-for="reg_residenza"
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

          <!-- Field: Provincia di Residenza -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <validation-provider
              #default="validationContext"
              name="Provincia di Residenza"
              rules="required"
            >
              <b-form-group
                label="Provincia"
                label-for="prov_residenza"
                :state="getValidationState(validationContext)"
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
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Comune di Residenza -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <validation-provider
              #default="validationContext"
              name="Comune di Residenza"
              rules="required"
            >
              <b-form-group
                label="Comune"
                label-for="comune_residenza"
                :state="getValidationState(validationContext)"
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
                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Località di Residenza -->
          <b-col
            cols="12"
            md="4"
          >
            <validation-provider
              #default="validationContext"
              name="Località di Residenza"
              rules="required"
            >
              <b-form-group
                label="Località"
                label-for="localita_residenza"
              >
                <b-form-input
                  id="localita_residenza"
                  v-model="itemData.localita_residenza"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: CAP -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <validation-provider
              #default="validationContext"
              name="CAP di Residenza"
              rules="required"
            >
              <b-form-group
                label="CAP"
                label-for="cap_residenza"
              >
                <b-form-input
                  id="cap_residenza"
                  v-model="itemData.cap_residenza"
                  type="number"
                  placeholder="11111"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Indirizzo -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <validation-provider
              #default="validationContext"
              name="Indirizzo di Residenza"
              rules="required"
            >
              <b-form-group
                label="Indirizzo"
                label-for="indirizzo_residenza"
              >
                <b-form-input
                  id="indirizzo_residenza"
                  v-model="itemData.indirizzo_residenza"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Field: Telefono -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Telefono"
              label-for="telefono"
            >
              <b-form-input
                id="telefono"
                v-model="itemData.telefono"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Telefono 2 -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Telefono 2"
              label-for="telefono2"
            >
              <b-form-input
                id="telefono2"
                v-model="itemData.telefono2"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Fax -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Fax"
              label-for="fax"
            >
              <b-form-input
                id="fax"
                v-model="itemData.fax"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Mobile -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Mobile"
              label-for="mobile"
            >
              <b-form-input
                id="mobile"
                v-model="itemData.mobile"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Mobile Int -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Mobile Int"
              label-for="mobile_int"
            >
              <b-form-input
                id="mobile_int"
                v-model="itemData.mobile_int"
              />
            </b-form-group>
          </b-col>

        </b-row>

        <!-- Header: Privacy -->
        <div
          v-if="isCreateNew === true"
          class="d-flex mt-2"
        >
          <feather-icon
            icon="MapPinIcon"
            size="19"
          />
          <h4 class="mb-0 ml-50">
            Privacy
          </h4>
        </div>

        <!-- Form: Privacy -->
        <b-row
          v-show="isCreateNew === true"
          class="mt-1"
        >
          <!-- Field: Privacy 1 -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Privacy 1"
              label-for="privacy1"
            >
              <b-form-checkbox
                id="privacy1"
                :checked="itemData.privacy1"
                switch
                @click.native.stop
                @change="updatePrivacy1()"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Privacy 2 -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Privacy 2"
              label-for="privacy2"
            >
              <b-form-checkbox
                id="privacy2"
                :checked="itemData.privacy2"
                switch
                @click.native.stop
                @change="updatePrivacy2()"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Privacy 3 -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Privacy 3"
              label-for="privacy3"
            >
              <b-form-checkbox
                id="privacy3"
                :checked="itemData.privacy3"
                switch
                @click.native.stop
                @change="updatePrivacy3()"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Privacy 4 -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Privacy 4"
              label-for="privacy4"
            >
              <b-form-checkbox
                id="privacy4"
                :checked="itemData.privacy4"
                switch
                @click.native.stop
                @change="updatePrivacy4()"
              />
            </b-form-group>
          </b-col>

        </b-row>

        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            type="submit"
          >
            Conferma
          </b-button>
          <!-- <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="button"
            variant="outline-secondary"
            @click="hide"
          >
            Cancel
          </b-button> -->
        </div>

      </b-form>
    </validation-observer>

  </div>
</template>

<script>
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormCheckbox, BFormInvalidFeedback,
} from 'bootstrap-vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import { required, alphaNum, email } from '@validations'

import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import { ref, toRefs, onMounted } from '@vue/composition-api'

// import store from '@/store'
// import personeDbManag from '../personeDbManag'

import useRegioniProvComuni from '../../useRegioniProvComuni'

import personeDbManag from '../personeDbManag'

import VSearchSelect from '../../../../components/bit-kit/VSearchSelect.vue'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    vSelect,
    flatPickr,
    BButton,
    BFormCheckbox,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    VSearchSelect,
  },
  directives: {
    Ripple,
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
  data() {
    return {
      required,
      alphaNum,
      email,
    }
  },
  setup(props, { emit }) {
    const { itemLookup, itemData, preFilteredJsonLookup } = toRefs(props)

    const refStatoNascita = ref({ id: 0, denominazione: '' })
    const refCittadinanza = ref({ id: 0, stato: '' })
    const refCittadSportiva = ref({ id: 0, stato: '' })
    const refComuneNascita = ref({ id: 0, comune: '' })

    const genderOptions = [
      'M',
      'F',
    ]
    const refGenderOptions = ref([])
    const stati_nascita = ref([])
    const stati_cittad = ref([])

    // const funcGetJsonComNascita = ref(getJsonComNascita)
    // const getJsonComNascita =  (json) => {
    //   return json.comuni_nascita
    // }

    // const APP_STORE_MODULE_NAME = 'anag-persone'

    // -------------- Regioni - Province - Comuni -----------------

    const setComuneResDbValue = codC => {
      itemData.value.comune_residenza = codC
      // if (!codC) {
      //   itemData.value.localita_nascita = null
      // } else {
      //   if (comuniList.value) {
      //     const com = comuniList.value.find((c) => c.codC === codC)
      //     if (com) {
      //       itemData.value.localita_nascita = com.nomeC
      //     }
      //   }
      // }
    }

    const setProvResDbValue = codP => {
      itemData.value.prov_residenza = codP
    }

    const useRegProvCom = useRegioniProvComuni()
    useRegProvCom.refSetComuneDb.value = setComuneResDbValue
    useRegProvCom.refSetProvDb.value = setProvResDbValue

    const {
      fetchRegioniProvince,
      // fetchComuniNascita,
      regioniProvList,
      provinceList,
      comuniList,
      // comuni_nascita,
      onRegChanged,
      onProvChanged,
      onComuneChanged,
      refRegione,
      refProv,
      refComune,
    } = useRegProvCom

    // -------------------------- END -------------------------------

    const fetchRefs = () => {
      refGenderOptions.value = genderOptions
      stati_nascita.value = itemLookup.value.stati_nascita
      stati_cittad.value = itemLookup.value.stati_cittadinanza

      refStatoNascita.value = stati_nascita.value.find(sn => sn.id === itemData.value.stato_nascita)
      refCittadinanza.value = stati_cittad.value.find(c => c.id === itemData.value.cittadinanza)
      refCittadSportiva.value = stati_cittad.value.find(cs => cs.id === itemData.value.cittadinanza_sportiva)

      // -------------- Regioni - Province - Comuni -----------------
      const provComuniJsonStr = preFilteredJsonLookup.value ? preFilteredJsonLookup.value[0] : ''

      fetchRegioniProvince(itemData.value.comune_residenza,
        itemData.value.prov_residenza,
        provComuniJsonStr,
        itemLookup.value.istat_regioni_province)
    // -------------------------- END -------------------------------
    }

    onMounted(fetchRefs)

    // const onComuniNasChanged = (val) => {
    //   if (!val) { return; }
    //   itemData.value.comune_nascita = val.id
    //   refComuneNascita.value = val
    // }

    const onStatoNascitaChanged = val => {
      if (!val) { return }
      itemData.value.stato_nascita = val.id
      refStatoNascita.value = val
    }

    const onCittadChanged = val => {
      if (!val) { return }
      itemData.value.cittadinanza = val.id
      refCittadinanza.value = val
    }

    const onCittadSportChanged = val => {
      if (!val) { return }
      itemData.value.cittadinanza_sportiva = val.id
      refCittadSportiva.value = val
    }

    const updatePrivacy1 = () => {
      // eslint-disable-next-line no-param-reassign
      itemData.value.privacy1 = !itemData.value.privacy1
    }

    const updatePrivacy2 = () => {
      // eslint-disable-next-line no-param-reassign
      itemData.value.privacy2 = !itemData.value.privacy2
    }

    const updatePrivacy3 = () => {
      // eslint-disable-next-line no-param-reassign
      itemData.value.privacy3 = !itemData.value.privacy3
    }

    const updatePrivacy4 = () => {
      // eslint-disable-next-line no-param-reassign
      itemData.value.privacy4 = !itemData.value.privacy4
    }

    // ---------------------- onSubmit - Reset ------------------------

    const resetItemData = () => {}

    const onSubmit = () => {
      emit('update-data')
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetItemData)
    // ------------------------------------------------------------------

    return {

      refComuneNascita,
      // onComuniNasChanged,
      // fetchComuniNascita,
      // comuni_nascita,

      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,

      fetchRefs,
      stati_nascita,
      stati_cittad,

      onStatoNascitaChanged,
      onCittadChanged,
      onCittadSportChanged,

      refGenderOptions,
      refStatoNascita,
      refCittadinanza,
      refCittadSportiva,

      regioniProvList,
      provinceList,
      comuniList,
      onRegChanged,
      onProvChanged,
      onComuneChanged,
      refRegione,
      refProv,
      refComune,

      updatePrivacy1,
      updatePrivacy2,
      updatePrivacy3,
      updatePrivacy4,
      personeDbManag,
      // funcGetJsonComNascita,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
