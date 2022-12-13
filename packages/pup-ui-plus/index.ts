import installer from './defaults'
export * from '@pup-ui-plus/components'
export * from '@pup-ui-plus/constants'
//TODO: 暂时先注释
// export * from '@pup-ui-plus/directives'
export * from '@pup-ui-plus/hooks'
export * from '@pup-ui-plus/tokens'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer
