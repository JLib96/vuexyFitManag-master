<template>

  <div>

    <!-- <persone-list-add-new
      :is-add-new-persone-sidebar-active.sync="isAddNewPersoneSidebarActive"
      @refetch-data="refetchData"
    /> -->

    <!-- Filters -->
    <persone-list-filters
      :nome-filter.sync="nomeFilter"
      :cognome-filter.sync="cognomeFilter"
      :cod_fisc-filter.sync="cod_fiscFilter"
      @launchFilter="() => refetchData()"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <!-- <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                variant="primary"
                @click="isAddNewPersoneSidebarActive = true"
              >
                <span class="text-nowrap">Aggiungi Persona</span>
              </b-button>
            </div>
          </b-col> -->
        </b-row>

      </div>

      <b-table
        ref="refListTable"
        class="position-relative"
        :items="fetchItems"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="Nessun Risultato"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: Nome -->
        <template #cell(nome)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'app-fit-anag-persone-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.nome }}
            </b-link>
            <small class="text-muted">@{{ data.item.nome }}</small>
          </b-media>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalItems"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'

// import PersoneListAddNew from './PersoneListAddNew.vue'
import PersoneListFilters from './PersoneListFilters.vue'
import usePersoneList from './usePersoneList'
import personeDbManag from '../personeDbManag'

export default {
  components: {
    PersoneListFilters,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },
  setup() {
    const APP_STORE_MODULE_NAME = 'anag-persone'

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME)) store.registerModule(APP_STORE_MODULE_NAME, personeDbManag)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(APP_STORE_MODULE_NAME)) store.unregisterModule(APP_STORE_MODULE_NAME)
    })

    const {
      refListTable,
      perPage,
      totalItems,
      currentPage,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      statusFilter,
      dataMeta,
      refetchData,

      nomeFilter,
      cognomeFilter,
      cod_fiscFilter,

      tableColumns,
      fetchItems,

    } = usePersoneList()

    return {
      refListTable,
      perPage,
      totalItems,
      currentPage,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      statusFilter,
      dataMeta,
      refetchData,

      nomeFilter,
      cognomeFilter,
      cod_fiscFilter,

      tableColumns,
      fetchItems,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
