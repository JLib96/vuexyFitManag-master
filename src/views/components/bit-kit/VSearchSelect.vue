<template>
  <div>

    <v-select
      :input-id="inputId"
      :label="label"
      :value="refItem"
      :options="refOptions"
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
      :clearable="false"
      @input="(val) => onInnerInput(val)"
      @search="fetchItems"
    />

  </div>

</template>

<script>

import vSelect from 'vue-select'
import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'
import { ref, toRefs, onMounted } from '@vue/composition-api'

import store from '@/store'

export default {
  components: {
    vSelect,
  },
  model: {
    prop: 'idRef',
    event: 'update:id-ref',
  },
  model: {
    prop: 'textOnLoad',
    event: 'update:text-on-load',
  },

  props: {
    idRef: {
      type: Number,
      required: true,
    },
    textOnLoad: {
      type: String,
      required: false,
      default: 'Ricerca...',
    },
    inputId: {
      type: String,
      required: false,
      default: 'id',
    },
    label: {
      type: String,
      required: false,
      default: 'value',
    },
    optionsJsonNode: {
      type: String,
      required: false,
      default: 'options',
    },
    options: {
      type: Array,
      required: false,
      // default: []
    },
    moduleName: {
      type: String,
      required: true,
    },
    refModule: {
      type: Object,
      required: true,
    },
    searchMethod: {
      type: String,
      required: true,
    },
    maxItemsNum: {
      type: String,
      required: false,
      default: '25',
    },
  },

  setup(props, { emit }) {
    const {
      idRef, textOnLoad, inputId, label,
      optionsJsonNode, options, moduleName,
      refModule, searchMethod, maxItemsNum,
    } = toRefs(props)

    // -------------- build options and select option on load  -----------------

    const buildOptionStr = () => {
      const idField = inputId.value
      const lblField = label.value
      const idVal = idRef.value == null ? '0' : idRef.value.toString()
      const lblVal = textOnLoad.value
      return `{"${idField}": ${idVal}, "${lblField}": "${lblVal}"}`
    }

    const optStr = buildOptionStr()

    const refOptions = ref(options.value)
    if (refOptions.value == null || refOptions.value.length < 1) {
      const emptyOptionsStr = `{"options": [${optStr}]}`
      const emptyOptions = JSON.parse(emptyOptionsStr)
      refOptions.value = emptyOptions.options
    }

    const opt = JSON.parse(optStr)
    const refItem = ref(opt)

    //---------------------------------------------------------------------------
    // -----------------------------findOption------------------------------------

    const findOption = () => {
      const id = idRef.value
      if (id == null) { return null }
      if (!refOptions.value) { return null }
      const idField = inputId.value
      const optToSet = refOptions.value.find(opt => {
        const optId = getOptionId(idField, opt)
        return id === optId
      })
      return optToSet
    }

    const getOptionId = (idField, opt) => {
      const jsObj = JSON.parse(JSON.stringify(opt))
      return jsObj[idField]
    }

    const setOption = () => {
      const opt = findOption()
      refItem.value = opt
    }

    //---------------------------------------------------------------------------

    onMounted(setOption)

    //---------------------------------------------------------------------------

    const refMaxNum = ref(25)
    if (!isNaN(maxItemsNum.value)) {
      refMaxNum.value = parseInt(maxItemsNum.value, 10)
    }

    const onInnerInput = obj => {
      if (!obj) { return }
      refItem.value = obj
      const jsObj = JSON.parse(JSON.stringify(obj))
      const idVal = jsObj[inputId.value]
      const lblVal = jsObj[label.value]
      emit('inner-input')
      emit('update:id-ref', idVal)
      emit('update:text-on-load', lblVal)
    }

    //---------------------------------------------------------------------------

    const regModule = () => {
      // Register module
      if (!store.hasModule(moduleName.value)) { store.registerModule(moduleName.value, refModule.value) }
    }

    const unregModule = () => {
    // UnRegister module
      if (store.hasModule(moduleName.value)) store.unregisterModule(moduleName.value)
    }

    const fetchItems = (search, loading) => {
      regModule()
      if (search.length) {
        loading(true)
        fetchDebuonce(loading, search)
      }
    }

    const fetchDebuonce = (loading, search) => debounce(fetchData(loading, search), 350)

    const fetchData = (loading, search) => {
      const type = `${moduleName.value}/${searchMethod.value}`
      store.dispatch(type, { search, maxNum: refMaxNum.value })
        .then(response => {
          loading(false)
          if (response.data) {
            // console.debug(response.data)
            const json = JSON.parse(response.data)
            refOptions.value = json[optionsJsonNode.value]
          }
        }).catch(error => {
          if (error.response.status === 404) {}
        }).finally(() => { unregModule() })
    }

    const debounce = (fn, delay) => {
      let timeout
      return (...args) => {
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          fn(...args)
        }, delay)
      }
    }

    return {
      refItem,
      onInnerInput,
      fetchItems,
      refOptions,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
