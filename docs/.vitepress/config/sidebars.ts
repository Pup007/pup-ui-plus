import { ensureLang } from '../utils/lang'
import guideLocale from '../i18n/pages/guide.json'
import componentLocale from '../i18n/pages/component.json'

function getGuideSidebar() {
  return Object.fromEntries(
    Object.entries(guideLocale).map(([lang, val]) => [
      lang,
      Object.values(val).map((item) => mapPrefix(item, lang)),
    ])
  )
}

function getComponentsSideBar() {
  return Object.fromEntries(
    Object.entries(componentLocale).map(([lang, val]) => [
      lang,
      Object.values(val).map((item) => mapPrefix(item, lang, '/component')),
    ])
  )
}

function mapPrefix(item: Item, lang: string, prefix = '') {
  if (item.children && item.children.length > 0) {
    return {
      ...item,
      children: item.children.map((child) => mapPrefix(child, lang, prefix)),
    }
  }
  return {
    ...item,
    link: `${ensureLang(lang)}${prefix}${item.link}`,
  }
}

// return sidebar with language configs.
// this might create duplicated data but the overhead is ignorable
const getSidebars = () => {
  return {
    '/guide/': getGuideSidebar(),
    '/component/': getComponentsSideBar(),
  }
}

export const sidebars = getSidebars()
