import consola from 'consola'
import { REPO_BRANCH, REPO_PATH } from '@pup-ui-plus/build-constants'
import { docsDirName } from '@pup-ui-plus/build-utils'
import { languages } from './utils/lang'
//TODO: 修改到此处?
import { features, head, mdPlugin, nav, sidebars } from './config'

import type { UserConfig } from 'vitepress'

consola.debug(`DOC_ENV: ${process.env.DOC_ENV}`)

export const config: UserConfig = {
  title: 'Pup ui Plus',
  description: 'a Vue 3 based component library for designers and developers',
  lastUpdated: true,
  head,
  themeConfig: {
    repo: REPO_PATH,
    docsBranch: REPO_BRANCH,
    docsDir: docsDirName,

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    logo: '/images/element-plus-logo.svg',
    logoSmall: '/images/element-plus-logo-small.svg',
    sidebars,
    nav,
    agolia: {
      apiKey: '377f2b647a96d9b1d62e4780f2344da2',
      appId: 'BH4D9OD16A',
    },
    features,
    langs: languages,
  },

  locales,

  markdown: {
    config: (md) => mdPlugin(md),
  },

  vue: {
    template: {
      ssr: true,
      compilerOptions: {
        directiveTransforms: buildTransformers(),
      },
    },
  },
}

export default config
