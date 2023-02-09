<template>
  <span ref="arrowRef" :class="ns.e('arrow')" data-popper-arrow="" />
</template>

<script lang="ts" setup>
import { inject, onBeforeUnmount, watch } from 'vue'
import { useNamespace } from '@pup-ui-plus/hooks'
import { POPPER_CONTENT_INJECTION_KEY } from '@pup-ui-plus/tokens'
import { usePopperArrowProps } from './arrow'

defineOptions({
  name: 'ElPopperArrow',
  inheritAttrs: false,
})

const props = defineProps(usePopperArrowProps)

const ns = useNamespace('popper')
const { arrowOffset, arrowRef } = inject(
  POPPER_CONTENT_INJECTION_KEY,
  undefined
)!

watch(
  () => props.arrowOffset,
  (val) => {
    arrowOffset.value = val
  }
)
onBeforeUnmount(() => {
  arrowRef.value = undefined
})

defineExpose({
  /**
   * @description Arrow element
   */
  arrowRef,
})
</script>
