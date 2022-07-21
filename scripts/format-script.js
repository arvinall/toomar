import path from 'path'

import {
  srcDirectory,
  createWatcher,
  checkExtension,
  spawnHere,
  localNpmBinaries
} from './utils.js'

const {
  URL,
  Promise,
  Error,

  process,
  console
} = globalThis

/**
 * Check typescript and javascript files
 *
 * @param {string} fileAddress
 *
 * @returns {boolean}
 */
export const checkExtensionFormat = fileAddress => checkExtension(
  fileAddress,
  ['js']
)

export function format (sourceDirectory = srcDirectory, fileAddress) {
  const titles = ['Format']

  let address = sourceDirectory

  if (typeof fileAddress === 'string') {
    titles.push(fileAddress)

    address = path.resolve(
      sourceDirectory,
      path.relative(sourceDirectory, fileAddress)
    )
  }

  return spawnHere(
    titles.join(),
    path.resolve(localNpmBinaries, 'eslint'),
    ['--fix', address]
  )
}

if (process.argv[1] === (new URL(import.meta.url)).pathname) {
  (async () => {
    let sourceDirectory = process.argv.slice(2).slice(-1)[0]

    if (typeof sourceDirectory !== 'string') sourceDirectory = srcDirectory

    let lastExitPromise
    let lastChildProcess

    async function formatFlow (fileAddress) {
      if (typeof fileAddress === 'string') {
        if (!checkExtensionFormat(fileAddress)) return
      }

      if (
        lastChildProcess &&
        lastChildProcess.exitCode === null &&
        !lastChildProcess.killed
      ) return

      try { await lastExitPromise } catch (error) {}

      lastExitPromise = format(sourceDirectory, fileAddress)

      lastExitPromise.catch(error => {
        if (error instanceof Error) console.error(error)
      })

      lastChildProcess = lastExitPromise.childProcess
    }

    formatFlow()

    const watcher = createWatcher(sourceDirectory)

    await new Promise(resolve => watcher.once('ready', resolve))

    watcher
      .on('add', formatFlow)
      .on('change', formatFlow)
  })()
}
