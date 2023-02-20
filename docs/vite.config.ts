import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig, loadEnv } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import UnoCSS from 'unocss/vite'
import mkcert from 'vite-plugin-mkcert'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {
  docPackage,
  epPackage,
  getPackageDependencies,
  projRoot,
} from '@pup-ui-plus/build-utils'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

import type { Alias } from 'vite'

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
  },
]
if (process.env.DOC_ENV !== 'production') {
  //! 开发模式：进行路径转换，方便引用最新代码
  alias.push(
    {
      find: /^pup-ui-plus(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/pup-ui-plus/index.ts'),
    },
    {
      find: /^pup-ui-plus\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`,
    }
  )
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  /* packages/pup-ui-plus/package.json */
  const { dependencies: epDeps } = getPackageDependencies(epPackage)
  /* docs/package.json */
  const { dependencies: docsDeps } = getPackageDependencies(docPackage)

  //! 依赖优化
  const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
    (dep) =>
      !dep.startsWith('@types/') &&
      !['@pup-ui-plus/metadata', 'pup-ui-plus'].includes(dep)
  )

  //! 依赖优化：时间库
  optimizeDeps.push(
    ...(await glob(['dayjs/plugin/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
      onlyFiles: true,
    }))
  )

  return {
    server: {
      host: true,
      https: !!env.HTTPS,
      fs: {
        allow: [projRoot],
      },
    },
    resolve: {
      alias,
    },
    plugins: [
      //! VueMacros：针对插件包装了一层，支持vite\rollup\esbuild等插件
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx(),
        },
      }),

      //! 自动导入组件插件：避免手动import组件和components定义组件
      //相关文档：https://github.com/antfu/unplugin-vue-components
      Components({
        //自动引入组件的位置
        dirs: ['.vitepress/vitepress/components'],

        allowOverrides: true,

        // custom resolvers
        resolvers: [
          // ! 自动导入说使用的图标
          // https://github.com/antfu/unplugin-icons
          IconsResolver(),
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      //! 图标库：自动安装所使用的图标
      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
      }),
      //! 按需生成css引擎
      // https://github.com/unocss/unocss
      UnoCSS(),
      //! 转换markdown文件，自动注入headers + footers内容
      MarkdownTransform(),
      //! 用于辅助插件开发
      Inspect(),
      //! 使开发环境也支持使用https
      // https://github.com/liuweiGL/vite-plugin-mkcert#readme
      mkcert(),
    ],
    optimizeDeps: {
      //! 针对依赖优化进行预编译，加快打包构建过程
      include: optimizeDeps,
    },
  }
})
