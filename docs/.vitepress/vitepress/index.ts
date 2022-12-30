import 'normalize.css'

import VPApp from './components/vp-app.vue'
import VPDemo from './components/vp-demo.vue'
import IconList from './components/globals/icons.vue'

import './styles/css-vars.scss'
import './styles/app.scss'

import 'uno.css'

import type { Component } from 'vue'

export { default as NotFound } from './components/vp-not-found.vue'
export default VPApp

export const globals: [string, Component][] = [
  ['Demo', VPDemo],
  ['IconList', IconList],
]
