import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  toRef,
  watch,
} from 'vue'
import { formContextKey, formItemContextKey } from '@pup-ui-plus/tokens'

export const useFormItem = () => {
  const form = inject(formContextKey, undefined)
  const formItem = inject(formItemContextKey, undefined)
  return {
    form,
    formItem,
  }
}
