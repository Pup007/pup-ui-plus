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
    runTask('buildModules')
    //TODO: 修改到此处?
    /*  runTask('buildFullBundle'),
     runTask('generateTypesDefinitions'),
     runTask('buildHelper'),
     series(
       withTaskName('buildThemeChalk', () =>
         run('pnpm run -C packages/theme-chalk build')
       ),
       copyFullStyle
     ) */
  )

  // parallel(copyTypesDefinitions, copyFiles)
)

export * from './src'
