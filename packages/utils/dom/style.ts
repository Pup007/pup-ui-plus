import { isClient } from '@vueuse/core'
import { isNumber, isObject, isString } from '../types'
import { debugWarn } from '../error'
import { camelize } from '../strings'

import type { CSSProperties } from 'vue'

const SCOPE = 'utils/dom/style'

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return ''
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return `${value}${defaultUnit}`
  }
  debugWarn(SCOPE, 'binding value must be a string or number')
}

export const classNameToArray = (cls = '') =>
  cls.split(' ').filter((item) => !!item.trim())

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}

export const getStyle = (
  element: HTMLElement,
  styleName: keyof CSSProperties
): string => {
  if (!isClient || !element || !styleName) return ''

  let key = camelize(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = (element.style as any)[key]
    if (style) return style
    const computed: any = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    return (element.style as any)[key]
  }
}
