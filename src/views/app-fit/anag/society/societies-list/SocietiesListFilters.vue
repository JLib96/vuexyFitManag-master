<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filtro Società
      </h5>
    </b-card-header>
    <b-card-body>

      <b-row>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Nome Società</label>
          <b-form-input
            type="text"
            :value="societyNameFilter"
            @input="(val) => $emit('update:societyNameFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Stagione di Affiliazione</label>
          <b-form-input
            type="number"
            :value="affSeasonFilter"
            @input="(val) => $emit('update:affSeasonFilter', !val ? null : parseInt(val, 10))"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Affiliata Da</label>
          <b-form-datepicker
            local="it"
            placeholder="Seleziona una data..."
            class="mb-1"
            selected-variant="success"
            :value="affDateFromFilter"
            @input="(val) => $emit('update:affDateFromFilter', !val ? null : new Date(val))"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Affiliata A</label>
          <b-form-datepicker
            local="it"
            placeholder="Seleziona una data..."
            class="mb-1"
            selected-variant="success"
            :value="affDateToFilter"
            @input="(val) => $emit('update:affDateToFilter', !val ? null : new Date(val))"
          />
        </b-col>

        <!-- Select -->
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Disciplina</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="disciplineFilter"
            :options="disciplineOptions"
            class="mb-1"
            :reduce="val => val.value"
            @input="(val) => $emit('update:disciplineFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Regione</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="regionFilter"
            :options="regionOptions"
            class="mb-1"
            :reduce="val => val.value"
            @input="(val) => $emit('update:regionFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Stato Società</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="societyStateFilter"
            :options="societyStateOptions"
            class="mb-1"
            :reduce="val => val.value"
            @input="(val) => $emit('update:societyStateFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="d-flex align-items-center"
        >
          <label>Documento Modificato&nbsp;&nbsp;</label>
          <b-form-checkbox
            class="mb-1"
            :value="modifiedDocumentFilter"
            switch
            inline
            @input="(val) => $emit('update:modifiedDocumentFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="d-flex align-items-center"
        >
          <label>Stagione corrente di Affiliazione&nbsp;&nbsp;</label>
          <b-form-checkbox
            class="mb-1"
            :value="affCurrentSeasonFilter"
            switch
            inline
            @input="(val) => $emit('update:affCurrentSeasonFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="d-flex align-items-center"
        >
          <b-button
            variant="primary"
            @click="() => $emit('launchFilter')"
          >
            <span class="text-nowrap">CERCA</span>
          </b-button>
        </b-col>
      </b-row>

    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BFormCheckbox, BButton, BFormInput, BFormDatepicker, BCardBody, BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BFormCheckbox,
    BButton,
    BFormInput,
    BFormDatepicker,
    BFormGroup,
    vSelect,
  },

  props: {
    societyNameFilter: {
      type: [String, null],
      default: null,
    },
    affSeasonFilter: {
      type: [Number, null],
      default: null,
    },
    disciplineFilter: {
      type: [Number, null],
      default: null,
    },
    affDateFromFilter: {
      type: [Date, null],
      default: null,
    },
    affDateToFilter: {
      type: [Date, null],
      default: null,
    },
    regionFilter: {
      type: [Number, null],
      default: null,
    },
    modifiedDocumentFilter: {
      type: [Boolean, null],
      default: null,
    },
    societyStateFilter: {
      type: [Number, null],
      default: null,
    },
    affCurrentSeasonFilter: {
      type: [Boolean, null],
      default: null,
    },

    disciplineOptions: {
      type: Array,
      required: true,
    },
    regionOptions: {
      type: Array,
      required: true,
    },
    societyStateOptions: {
      type: Array,
      required: true,
    },

  },
}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
