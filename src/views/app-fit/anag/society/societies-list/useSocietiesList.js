// import { ref, watch, computed } from '@vue/composition-api'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { ref, watch } from '@vue/composition-api'
import useAnagListBase from '../../useAnagListBase'

import store from '@/store'

export default function useSocietiesList() {
  // Use toast
  const toast = useToast()

  const isAddNewSocietySidebarActive = ref(false)

  const societyNameFilter = ref() // String?
  const affSeasonFilter = ref() // int?
  const disciplineFilter = ref() // int?
  const affDateFromFilter = ref() // DateTime?
  const affDateToFilter = ref() // DateTime?
  const regionFilter = ref() // int?
  const modifiedDocumentFilter = ref() // bool?
  const societyStateFilter = ref() // int?
  const affCurrentSeasonFilter = ref() // bool?

  // Table Handlers
  const tableColumns = [
    {
      key: 'societyName', label: 'Nome Società', formatter: title, sortable: true,
    },
    {
      key: 'affiliationCode', label: 'Codice Affiliazione', formatter: title, sortable: true,
    },
    {
      key: 'address', label: 'Indirizzo', formatter: title, sortable: true,
    },
    {
      key: 'state', label: 'Status', formatter: title, sortable: true,
    },
  ]

  const fetchItems = (ctx, callback) => {
    // console.debug(affDateFromFilter.value)
    const sName = !societyNameFilter.value ? null : `%${societyNameFilter.value}%`
    const payload = {
      societyName: sName,
      affiliationSeason: affSeasonFilter.value,
      discipline: disciplineFilter.value,
      affiliationDateFrom: affDateFromFilter.value,
      affiliationDateTo: affDateToFilter.value,
      region: regionFilter.value,
      modifiedDocument: modifiedDocumentFilter.value,
      societyState: societyStateFilter.value,
      affiliateCurrentSeason: affCurrentSeasonFilter.value,
      rowstoskip: perPage.value * (currentPage.value - 1),
      fetchrows: perPage.value,
      sortcolumn: sortBy.value,
      sortorder: isSortDirDesc.value ? 'DESC' : 'ASC',
    }

    // console.debug(payload.societyName)
    // console.debug(payload.affiliationSeason)
    // console.debug(payload.discipline)
    // console.debug(payload.affiliationDateFrom)
    // console.debug(payload.affiliationDateTo)
    // console.debug(payload.region)
    // console.debug(payload.modifiedDocument)
    // console.debug(payload.societyState)
    // console.debug(payload.rowstoskip)
    // console.debug(payload.fetchrows)
    // console.debug(payload.sortcolumn)
    // console.debug(payload.sortorder)
    // console.debug(payload.sortcolumn)
    // console.debug(payload.sortorder)

    store
      .dispatch('anag-society/fetchSocieties', payload)
      .then(response => {
        const { elementsList, totalElements, outputInfo } = response.data
        if (elementsList) {
          callback(elementsList)
          totalItems.value = totalElements
        }
        if (outputInfo) {
          console.debug(outputInfo.msg)
          if (outputInfo.resultCode === -1) {
            toast({
              component: ToastificationContent,
              props: {
                title: outputInfo.msg,
                icon: 'AlertTriangleIcon',
                variant: 'danger',
              },
            })
          }
        }
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching societies list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // const discipline = ref(null) // int?
  const disciplineOptions = [
    { label: 'Tennis', value: 1 },
    { label: 'Tennis Tavolo', value: 2 },
    { label: 'Paddle', value: 3 },
    { label: 'Squash', value: 4 },
  ]

  // const societyState = ref(null) // int?
  const societyStateOptions = [
    { label: 'Pending', value: 1 },
    { label: 'Active', value: 2 },
    { label: 'Inactive', value: 3 },
  ]

  // const region = ref(null)  // int?
  const regionOptions = [
    { label: 'Abruzzo', value: 1 },
    { label: 'Basilicata', value: 2 },
    { label: 'Calabria', value: 3 },
    { label: 'Campania', value: 4 },
    { label: 'Emilia-Romagna', value: 5 },
    { label: 'Friuli Venezia Giulia', value: 6 },
    { label: 'Lazio', value: 7 },
    { label: 'Liguria', value: 8 },
    { label: 'Lombardia', value: 9 },
    { label: 'Marche', value: 10 },
    { label: 'Piemonte', value: 11 },
    { label: 'Puglia', value: 12 },
    { label: 'Sardegna', value: 13 },
    { label: 'Sicilia', value: 14 },
    { label: 'Toscana', value: 15 },
    { label: 'Trentino-Alto Adige', value: 16 },
    { label: 'Umbria', value: 17 },
    { label: 'Valle d\'Aosta', value: 18 },
    { label: 'Veneto', value: 19 },
  ]

  // ------------------------------------------------------

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveSocietyState = status => {
    if (status === 'Pending') return 'In Attesa'
    if (status === 'Accepted') return 'Affiliata'
    if (status === 'Inactive') return 'Inattiva'
    if (status === 'Rejected') return 'Rifiutata'
    return 'Affiliata'
  }

  const resolveSocietyStatusVariant = status => {
    if (status === 'Pending') return 'warning'
    if (status === 'Accepted') return 'success'
    if (status === 'Inactive') return 'secondary'
    if (status === 'Rejected') return 'secondary'
    return 'success'
  }

  const {
    // searchQuery,
    perPage,
    currentPage,
    perPageOptions,
    totalItems,
    refListTable,
    sortBy,
    isSortDirDesc,
    dataMeta,
    refetchData,
  } = useAnagListBase()

  // --- Aggiungo FILTRI DA MONITORARE A watchSources!!!

  watch([currentPage, perPage], () => {
    refetchData()
  })

  return {
    // searchQuery,
    societyNameFilter,
    perPage,
    currentPage,
    perPageOptions,
    totalItems,
    refListTable,
    sortBy,
    isSortDirDesc,
    dataMeta,
    refetchData,

    isAddNewSocietySidebarActive,
    disciplineOptions,
    societyStateOptions,
    regionOptions,
    statusOptions,

    affSeasonFilter,
    disciplineFilter,
    affDateFromFilter,
    affDateToFilter,
    regionFilter,
    modifiedDocumentFilter,
    societyStateFilter,
    affCurrentSeasonFilter,

    tableColumns,
    fetchItems,
    resolveSocietyState,
    resolveSocietyStatusVariant,
  }
}
