import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

/** `/dist/pup-ui-plus` */
export const epOutput = resolve(buildOutput, 'pup-ui-plus')
