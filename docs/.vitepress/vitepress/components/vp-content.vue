<script setup lang="ts">
import { computed, nextTick, onUpdated, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useSidebar } from '../composables/sidebar'

import VPHeroContent from './vp-hero-content.vue'
// import VPDocContent from './vp-doc-content.vue'

const { frontmatter } = useData()
const isHeroPost = computed(() => frontmatter.value.page === true)
const { hasSidebar } = useSidebar()
</script>

<template>
  <main :class="{ 'page-content': true, 'has-sidebar': hasSidebar }">
    <!-- <VPNotFound v-if="isNotFound" /> -->
    <VPHeroContent v-if="isHeroPost" />
    <!-- <VPDocContent v-else>
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
    </VPDocContent>
    <VPFooter v-if="!isHeroPost" /> -->
  </main>
</template>
