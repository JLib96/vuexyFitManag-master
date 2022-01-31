export const codeSocSearch = `
<template>
  <b-card-code title="Ricerca Avanzata - Società">
    <div class="custom-search">
      <!-- advance search input -->
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>Nome Società:</label>
            <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>Stato Società:</label>
            <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>Cod. Affiliazione:</label>
            <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>Indirizzo:</label>
            <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
      theme="my-theme"
      @on-row-click="onRowClick"
    >
      <template slot="table-row" slot-scope="props">
        <span>
          {{ props.formattedRow[props.column.field] }}
        </span> 
        <!-- <span v-if="props.column.field === 'fullName'" class="text-nowrap">
          <b-avatar
            :src="props.row.avatar"
            class="mx-1"
          />
          <span>{{ props.row.fullName }}</span>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span> -->
      </template>

      <!-- pagination -->
      <template slot="pagination-bottom" slot-scope="props">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['3','5','10']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
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
          </div>
        </div>
      </template>
    </vue-good-table>

    <template #code>
      {{ codeSocSearch }}
    </template>
  </b-card-code>
</template>

<script>

import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BRow, BCol,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  components: {
    BCardCode,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent, 
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      codeSocSearch,
      columns: [
        {
          label: 'Nome Società',
          field: 'societyName',
        },
        {
          label: 'Stato Società',
          field: 'state',
        },
        {
          label: 'Cod. Affiliazione',
          field: 'affiliationCode',
        },
        {
          label: 'Indirizzo',
          field: 'address',
        },
      ],
      rows: [],
      searchTerm: '',
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    const reg = { region: 6 };
    this.$db.post('Societies/getFilteredListView', reg)
      .then(res => { this.rows = res.data?.elementsList })
  },
  methods: {
    advanceSearch(val) {
      this.searchTerm = val
    },
    onRowClick(params) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: \`Hello user! You have clicked on row \${params.row.id}\`,
          icon: 'UserIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>
`
