import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import path from 'path'
import {
  epPackage,
  epRoot,
  pkgRoot,
  projRoot,
} from '@pup-ui-plus/build-utils'

import type { Plugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  return {
    resolve: {
      alias: [
        {
          find: /^pup-ui-plus(\/(es|lib))?$/,
          replacement: path.resolve(epRoot, 'index.ts'),
        },
        {
          find: /^pup-ui-plus\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`,
        },
      ],
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),
    ]
  }
})
