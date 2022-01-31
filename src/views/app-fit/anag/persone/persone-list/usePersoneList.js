// import { ref, watch, computed } from '@vue/composition-api'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ref, watch } from '@vue/composition-api'
import useAnagListBase from '../../useAnagListBase'
import store from '@/store'

export default function usePersoneList() {
  // Use toast
  const toast = useToast()

  const nomeFilter = ref() // String?
  const cognomeFilter = ref() // String?
  const cod_fiscFilter = ref() // String?

  function getFilterStr(refVal) {
    return !refVal.value ? null : `%${refVal.value}%`
  }

  // Table Handlers
  const tableColumns = [
    {
      key: 'nome', label: 'Nome', formatter: title, sortable: true,
    },
    {
      key: 'cognome', label: 'Cognome', formatter: title, sortable: true,
    },
    {
      key: 'cod_fisc', label: 'Cod. Fiscale', formatter: title, sortable: true,
    },
  ]

  const fetchItems = (ctx, callback) => {
    const sNome = getFilterStr(nomeFilter)
    const sCognome = getFilterStr(cognomeFilter)
    const sCod_fisc = getFilterStr(cod_fiscFilter)

    const payload = {
      nome: sNome,
      cognome: sCognome,
      cod_fisc: sCod_fisc,
      rowstoskip: perPage.value * (currentPage.value - 1),
      fetchrows: perPage.value,
      sortcolumn: sortBy.value,
      sortorder: isSortDirDesc.value ? 'DESC' : 'ASC',
    }

    // console.debug(payload.nome)
    // console.debug(payload.cognome)
    // console.debug(payload.cod_fisc)
    // console.debug(payload.rowstoskip)
    // console.debug(payload.fetchrows)
    // console.debug(payload.sortcolumn)
    // console.debug(payload.sortorder)

    store
      .dispatch('anag-persone/fetchPersone', payload)
      .then(response => {
        const {
          jsonResult, totalElements, resultCode, msg,
        } = response.data
        if (jsonResult) {
          const elementsList = JSON.parse(jsonResult)
          callback(elementsList)
          totalItems.value = totalElements
        } else {
          callback(null)
          totalItems.value = 0
        }
        if (resultCode === -1) {
          toast({
            component: ToastificationContent,
            props: {
              title: msg,
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        }
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching: Lista Persone',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  const {
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
    perPage,
    currentPage,
    perPageOptions,
    totalItems,
    refListTable,
    sortBy,
    isSortDirDesc,
    dataMeta,
    refetchData,
    nomeFilter,
    cognomeFilter,
    cod_fiscFilter,
    tableColumns,
    fetchItems,
  }
}
