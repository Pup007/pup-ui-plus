import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
//TODO: 暂时先不使用全局配置
import { /* provideGlobalConfig, */ useNamespace } from '..'
import type { VueWrapper } from '@vue/test-utils'

const TestComp = defineComponent({
  setup() {
    const ns = useNamespace('table')
    const cssVar = ns.cssVar({
      'border-style': 'solid',
      'border-width': '',
    })
    const cssVarBlock = ns.cssVarBlock({
      'text-color': '#409eff',
      'active-color': '',
    })
    return () => (
      <div
        id="testId"
        class={[
          ns.b(), // return ns + block
          ns.b('body'),
          ns.e('content'),
          ns.m('active'),
          ns.be('content', 'active'),
          ns.em('content', 'active'),
          ns.bem('body', 'content', 'active'),
          ns.is('focus'),
          ns.e(), // return empty string
          ns.m(), // return empty string
          ns.be(), // return empty string
          ns.em(), // return empty string
          ns.bem(), // return empty string
          ns.is('hover', undefined), // return empty string
          ns.is('clicked', false), // return empty string
        ]}
        style={{ ...cssVar, ...cssVarBlock }}
      >
        text
      </div>
    )
  },
})

describe('use-locale', () => {
  const Comp = defineComponent({
    setup(_props, { slots }) {
      // provideGlobalConfig({ namespace: 'ep' })
      return () => slots.default?.()
    },
  })
  let wrapper: VueWrapper<InstanceType<typeof Comp>>
  beforeEach(() => {
    wrapper = mount(Comp, {
      slots: { default: () => <TestComp /> },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should provide bem correctly', async () => {
    await nextTick()
    expect(wrapper.find('#testId').classes()).toEqual([
      'el-table', // b()
      'el-table-body', // b('body')
      'el-table__content', // e('content')
      'el-table--active', // m('active')
      'el-table-content__active', // be('content', 'active')
      'el-table__content--active', // em('content', 'active')
      'el-table-body__content--active', // bem('body', 'content', 'active')
      'is-focus', // is('focus')
    ])

    const style = wrapper.find('#testId').attributes('style')
    expect(style).toMatch('--el-border-style: solid;')
    expect(style).not.toMatch('--el-border-width:')
    expect(style).toMatch('--el-table-text-color: #409eff;')
    expect(style).not.toMatch('--el-table-active-color:')
  })
})
