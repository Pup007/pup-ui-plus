import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { epOutput } from '@pup-ui-plus/build-utils'
import { run, runTask, withTaskName } from './src'

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(epOutput, 'theme-chalk/index.css'),
    path.resolve(epOutput, 'dist/index.css')
  )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    //! 说明：打包packages所有模块代码
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions')
    /*    runTask('buildHelper'),
     series(
       withTaskName('buildThemeChalk', () =>
         run('pnpm run -C packages/theme-chalk build')
       ),
       copyFullStyle
     ) */
  )

  // parallel(copyTypesDefinitions, copyFiles)
)

//! 说明：需要导出所有任务，否则gulp会包找不到对应执行任务
export * from './src'
