<template>
  <layout-vertical>

    <router-view />

    <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    />

    <!-- <vertical-nav-menu-items
        :items="navMenuItems"
        class="navigation navigation-main"
      /> -->

  </layout-vertical>
</template>

<script>
//import VerticalNavMenuItems from '../../../layouts/layout-vertical/components/vertical-nav-menu/components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    AppCustomizer,
    LayoutVertical,
  },
  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    }
  },
}
</script>
