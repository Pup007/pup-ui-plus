import { defineComponent, renderSlot, watch } from 'vue'
import { buildProps, definePropType } from '@pup-ui-plus/utils'
import { provideGlobalConfig, useSizeProp } from '@pup-ui-plus/hooks'

import type { ExtractPropTypes } from 'vue'
import type { MessageConfigContext } from '@pup-ui-plus/components/message'
import type { Language } from '@pup-ui-plus/locale'
import type { ButtonConfigContext } from '@pup-ui-plus/components/button'
import type { ExperimentalFeatures } from '@pup-ui-plus/tokens'

export const messageConfig: MessageConfigContext = {}

export const configProviderProps = buildProps({
  // Controlling if the users want a11y features.
  a11y: {
    type: Boolean,
    default: true,
  },

  locale: {
    type: definePropType<Language>(Object),
  },

  size: useSizeProp,

  button: {
    type: definePropType<ButtonConfigContext>(Object),
  },

  experimentalFeatures: {
    type: definePropType<ExperimentalFeatures>(Object),
  },

  // Controls if we should handle keyboard navigation
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },

  message: {
    type: definePropType<MessageConfigContext>(Object),
  },

  zIndex: Number,

  namespace: {
    type: String,
    default: 'el',
  },
} as const)

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

const ConfigProvider = defineComponent({
  name: 'ElConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    watch(
      () => props.message,
      (val) => {
        Object.assign(messageConfig, val ?? {})
      },
      { immediate: true, deep: true }
    )
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})

export default ConfigProvider
