<template>
  <ul>
    <component
      :is="resolveNavItemComponent(item)"
      v-for="item in menuItems"
      :key="item.id"
      :item="item"
    />
  </ul>
</template>

<script>
import { copyOfresolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from '@vue/composition-api'
import VerticalNavMenuHeader from '../vertical-nav-menu-header'
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink_copy.vue'
import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'
import axios from 'axios'

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },
  data(){
    return{
      menuItems: []
    }
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  beforeMount(){
     axios
      .get("https://apitfc.bitkit.it/api/v1/menu/1")
      .then(response =>{
        for (let index = 0; index < response.data.menu.length; index++) {
          const element = response.data.menu[index];
          this.menuItems.push(element)
        }
        //this.menuItems.push()= response.data.menu.map((menuItem,index) => menuItem[index])
      } )
      .then(()=> console.log(this.menuItems))
      .catch(error => console.log(error))
  },
  setup() {
    provide('openGroups', ref([]))

    return {
      resolveNavItemComponent,
    }
  },
}
</script>
