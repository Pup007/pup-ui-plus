import { buildProps, definePropType } from '@pup-ui-plus/utils'
import type { Measurable } from '@pup-ui-plus/tokens'

export const usePopperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  virtualTriggering: Boolean,
  onMouseenter: Function,
  onMouseleave: Function,
  onClick: Function,
  onKeydown: Function,
  onFocus: Function,
  onBlur: Function,
  onContextmenu: Function,
  id: String,
  open: Boolean,
} as const)

export type PopperTriggerProps = typeof usePopperTriggerProps
