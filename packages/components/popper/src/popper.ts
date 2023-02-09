import { buildProps } from '@pup-ui-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const roleTypes = [
  'dialog',
  'grid',
  'listbox',
  'menu',
  'tooltip',
  'tree',
] as const

export const usePopperProps = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: 'tooltip',
  },
} as const)

export type UsePopperProps = ExtractPropTypes<typeof usePopperProps>
