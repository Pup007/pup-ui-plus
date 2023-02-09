import { componentSizes } from '@pup-ui-plus/constants'
import {
  buildProps,
  definePropType,
  isArray,
  isBoolean,
  isString,
} from '@pup-ui-plus/utils'

import type { ExtractPropTypes } from 'vue'
import type { FormRules } from '@pup-ui-plus/tokens'
import type { FormItemProp } from './form-item'

export const formProps = buildProps({
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object),
  },
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'right',
  },
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    values: componentSizes,
  },
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  scrollToError: Boolean,
} as const)
export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
}
export type FormEmits = typeof formEmits
