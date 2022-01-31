<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filtro Persone
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Nome</label>
          <b-form-input
            type="text"
            :value="nomeFilter"
            @input="(val) => $emit('update:nomeFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Cognome</label>
          <b-form-input
            type="text"
            :value="cognomeFilter"
            @input="(val) => $emit('update:cognomeFilter', val)"
          />
        </b-col>

        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Cod. Fiscale</label>
          <b-form-input
            type="text"
            :value="cod_fiscFilter"
            @input="(val) => $emit('update:cod_fiscFilter', val)"
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
  BCard, BCardHeader, BCardBody, BRow, BCol, BFormInput, BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    BFormInput,
    vSelect,
  },

  props: {
    nomeFilter: {
      type: [String, null],
      default: null,
    },
    cognomeFilter: {
      type: [String, null],
      default: null,
    },
    cod_fiscFilter: {
      type: [String, null],
      default: null,
    },
  },
}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
