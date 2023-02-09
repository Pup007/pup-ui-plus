import { isArray, isObject } from '@vue/shared'
export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
} from '@vue/shared'

export { isBoolean, isNumber } from '@vueuse/core'

export const isUndefined = (val: any): val is undefined => val === undefined

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}
