import { withInstall } from '@pup-ui-plus/utils'

import ConfigProvider from './src/config-provider'

export const ElConfigProvider = withInstall(ConfigProvider)
export default ElConfigProvider

export * from './src/config-provider'
