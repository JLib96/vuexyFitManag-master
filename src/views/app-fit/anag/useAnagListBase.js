import { ref, computed } from '@vue/composition-api'

export default function useAnagListBase() {
  const perPage = ref(10)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 25, 50, 100]
  const totalItems = ref(0)
  const refListTable = ref(null)
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalItems.value,
    }
  })

  const refetchData = () => {
    refListTable.value.refresh()
  }

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
  }
}
