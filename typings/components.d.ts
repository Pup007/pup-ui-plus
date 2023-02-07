// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ElIcon: typeof import('../packages/pup-ui-plus')['ElIcon']
  }
}

export {}
