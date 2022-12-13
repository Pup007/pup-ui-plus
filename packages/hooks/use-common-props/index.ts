import { buildProp } from '@pup-ui-plus/utils'
import { componentSizes } from '@pup-ui-plus/constants'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)
