import { readFile, writeFile, readdir } from 'fs/promises'
import { resolve } from 'path'

import { rootDirectory, distDirectory } from './utils.js'

const { name } = JSON.parse(await readFile(resolve(rootDirectory, 'package.json')))

export const declarationFileContent = 'export * from \'..\'\n'

export async function createBundleDeclarations () {
  const declarationNames = (await readdir(distDirectory))
    .filter(fileName => fileName.startsWith(name + '.') && fileName.endsWith('.js'))
    .map(fileName => fileName.split('.js')[0] + '.d.ts')

  return Object.assign(
    {},
    ...declarationNames.map(fileName => ({
      [fileName]: writeFile(
        resolve(distDirectory, fileName),
        declarationFileContent
      )
    }))
  )
}

if (process.argv[1] === (new URL(import.meta.url)).pathname) createBundleDeclarations()
