<script setup lang="ts">
import VPOverlay from './vp-overlay.vue'
import VPNav from './vp-nav.vue'
import VPContent from './vp-content.vue'

import { useToggleWidgets } from '../composables/toggle-widgets'
import { isClient, useStorage, useToggle } from '@vueuse/core'
import { breakpoints } from '~/constant'

const [isSidebarOpen, toggleSidebar] = useToggle(false)

useToggleWidgets(isSidebarOpen, () => {
  if (!isClient) return
  if (window.outerWidth >= breakpoints.lg) {
    toggleSidebar(false)
  }
})
</script>

<template>
  <div class="App">
    <VPOverlay
      class="overlay"
      :show="isSidebarOpen"
      @click="toggleSidebar(false)"
    />
    <VPNav />

    <VPContent :is-sidebar-open="isSidebarOpen">
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-mid>
        <slot name="aside-mid" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </VPContent>
  </div>
</template>

<style scoped lang="scss">
</style>
