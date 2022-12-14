import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { epRoot, excludeFiles, pkgRoot } from '@pup-ui-plus/build-utils'
import { PupUIPlusAlias } from '../plugins/pup-ui-plus-alias'
import { generateExternal, writeBundles } from '../utils'
import { buildConfigEntries, target } from '../build-info'

import type { OutputOptions } from 'rollup'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  const bundle = await rollup({
    input,
    plugins: [
      PupUIPlusAlias(),
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: false,
          }),
          vueJsx: vueJsx(),
        },
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        //! 疑问：为啥.vue采用esbuild中的ts编译? 原因：.vue 文件编译后就是ts了，所以采用ts编译
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    //! 过滤掉第三方依赖打包
    external: await generateExternal({ full: false }),
    treeshake: false,
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        //!说明: 保留目录结构, 设置成false会导致所有打包文件都放置在根目录下
        preserveModules: true,
        //! 说明：此处需要传packages的根路径，而不是epRoot根路径，否则会导致多附带一层packages目录。不知道element-plus 为啥设置成epRoot可以(未找到区别的地方)
        preserveModulesRoot: pkgRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}
