<template>
  <b-row>
    <b-col cols="12">
      <societies-advance-search />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import SocietiesAdvanceSearch from './SocietiesAdvanceSearch.vue'

export default {
  components: {
    BRow,
    BCol,
    SocietiesAdvanceSearch,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
