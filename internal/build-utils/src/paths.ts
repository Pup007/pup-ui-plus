import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const buildRoot = resolve(projRoot, 'internal', 'build')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

/** `/dist/pup-ui-plus` */
export const epOutput = resolve(buildOutput, 'pup-ui-plus')
