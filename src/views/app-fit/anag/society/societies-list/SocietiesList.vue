<template>

  <div>

    <society-list-add-new
      :is-add-new-society-sidebar-active.sync="isAddNewSocietySidebarActive"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <societies-list-filters
      :society-name-filter.sync="societyNameFilter"
      :aff-season-filter.sync="affSeasonFilter"
      :discipline-filter.sync="disciplineFilter"
      :aff-date-from-filter.sync="affDateFromFilter"
      :aff-date-to-filter.sync="affDateToFilter"
      :region-filter.sync="regionFilter"
      :modified-document-filter.sync="modifiedDocumentFilter"
      :society-state-filter.sync="societyStateFilter"
      :aff-current-season-filter.sync="affCurrentSeasonFilter"

      :discipline-options="disciplineOptions"
      :region-options="regionOptions"
      :society-state-options="societyStateOptions"
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
          <b-col
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
                @click="isAddNewSocietySidebarActive = true"
              >
                <span class="text-nowrap">Aggiungi Società</span>
              </b-button>
            </div>
          </b-col>
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
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: societyName -->
        <template #cell(societyName)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'app-fit-anag-societies-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.societyName }}
            </b-link>
            <small class="text-muted">@{{ data.item.societyName }}</small>
          </b-media>
        </template>

        <!-- Column: state -->
        <template #cell(state)="data">
          <b-badge
            pill
            :variant="`light-${resolveSocietyStatusVariant(data.item.state)}`"
            class="text-capitalize"
          >
            {{ resolveSocietyState(data.item.state) }}
          </b-badge>
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

import SocietiesListFilters from './SocietiesListFilters.vue'
import SocietyListAddNew from './SocietyListAddNew.vue'
import useSocietiesList from './useSocietiesList'
import societyDbManag from '../societyDbManag'

export default {
  components: {
    SocietiesListFilters,
    SocietyListAddNew,
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
    const APP_STORE_MODULE_NAME = 'anag-society'

    // Register module
    if (!store.hasModule(APP_STORE_MODULE_NAME)) store.registerModule(APP_STORE_MODULE_NAME, societyDbManag)

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

      societyNameFilter,
      affSeasonFilter,
      disciplineFilter,
      affDateFromFilter,
      affDateToFilter,
      regionFilter,
      modifiedDocumentFilter,
      societyStateFilter,
      affCurrentSeasonFilter,

      isAddNewSocietySidebarActive,
      disciplineOptions,
      societyStateOptions,
      regionOptions,
      statusOptions,

      tableColumns,
      fetchItems,
      resolveSocietyState,
      resolveSocietyStatusVariant,
    } = useSocietiesList()

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

      societyNameFilter,
      affSeasonFilter,
      disciplineFilter,
      affDateFromFilter,
      affDateToFilter,
      regionFilter,
      modifiedDocumentFilter,
      societyStateFilter,
      affCurrentSeasonFilter,

      isAddNewSocietySidebarActive, // Sidebar
      disciplineOptions,
      societyStateOptions,
      regionOptions,
      statusOptions,

      tableColumns,
      fetchItems,
      resolveSocietyState,
      resolveSocietyStatusVariant,
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

       <!-- Column: Role -->
        <!-- <template #cell(role)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveUserRoleIcon(data.item.role)"
              size="18"
              class="mr-50"
              :class="`text-${resolveUserRoleVariant(data.item.role)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.role }}</span>
          </div>
        </template> -->

        <!-- Column: Actions -->
        <!-- <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template> -->
