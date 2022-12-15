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
    /*
    ! 过滤掉第三方依赖打包，特别注意：packages/pup-ui-plus 由于是要整个组件库的包，所以需要用的到包都安装上，
    ! 否则会导致打包是会把库代码也给打包了，导致生成的目录多了一层packages，变成：dist/pup-ui-plus/es/packages/components 形式（多了一层packages）
    ! 原因：rollup 中的代码提取公共路径逻辑 inputBase = commondir(getAbsoluteEntryModulePaths(chunks))，会直接定位到根目录下，导致与配置的preserveModulesRoot不一致
    !      导致最后输出目录多了一层packages
    */
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
        //! 说明：确实是传epRoot根路径
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}
