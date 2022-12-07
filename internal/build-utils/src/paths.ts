import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const buildRoot = resolve(projRoot, 'internal', 'build')
export const epRoot = resolve(pkgRoot, 'pup-ui-plus')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

/** `/dist/pup-ui-plus` */
export const epOutput = resolve(buildOutput, 'pup-ui-plus')

export const epPackage = resolve(epRoot, 'package.json')
