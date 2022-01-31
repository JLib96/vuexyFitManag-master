<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="itemData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching data
      </h4>
      <div class="alert-body">
        No element found with this id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'app-fit-anag-societies-list'}"
        >
          Lista Società
        </b-link>
        for other societies.
      </div>
    </b-alert>

    <template v-if="itemData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <societies-view-info-card :item-data="itemData" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <!-- <user-view-user-plan-card /> -->
        </b-col>
      </b-row>

      <!-- <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <user-view-user-timeline-card />
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <user-view-user-permissions-card />
        </b-col>
      </b-row> -->

      <!-- <invoice-list /> -->
    </template>

  </div>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import store from '@/store'
import router from '@/router'

import societyDbManag from '../societyDbManag'
import SocietiesViewInfoCard from './SocietiesViewInfoCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    SocietiesViewInfoCard,

  },
  setup() {
    const itemData = ref(null)

    const APP_STORE_MODULE_NAME = 'anag-society'

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME)) store.registerModule(APP_STORE_MODULE_NAME, societyDbManag)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME)) store.unregisterModule(APP_STORE_MODULE_NAME)
    })

    store.dispatch('anag-society/fetchSociety', { id: router.currentRoute.params.id })
      .then(response => { itemData.value = response.data.anagElement })
      .catch(error => {
        if (error.response.status === 404) {
          itemData.value = undefined
        }
      })

    return {
      itemData,
    }
  },
}
</script>

<style>

</style>
