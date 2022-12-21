import { get, set } from 'lodash-unified'
import type { Arrayable } from '.'

export { hasOwn } from '@vue/shared'

//! 说明：添加T extends Object 约束，上传代码遭遇eslint报错，不添加T extends Object 又会导致typeCheck 报错。
//! 解决办法：ts-morph 切换至14.0.0的版本即可
export const keysOf = <T>(arr: T) => Object.keys(arr) as Array<keyof T>

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue)
    },
    set value(val: any) {
      set(obj, path, val)
    },
  }
}
