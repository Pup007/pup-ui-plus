import { makeInstaller } from './make-installer'
import Components from './component'
import Plugins from './plugin'

//TODO: 修改到此处?

export default makeInstaller([...Components, ...Plugins])
