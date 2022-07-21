import path from 'path'

import {
  testsDirectory,
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
 * Check test files
 *
 * @param {string} fileAddress
 *
 * @returns {boolean}
 */
export const checkExtensionTest = fileAddress => checkExtension(
  fileAddress,
  [['test', 'js'], ['test', 'ts']]
)

export function test (sourceDirectory = testsDirectory, fileAddress) {
  const titles = ['Test']

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
    path.resolve(localNpmBinaries, 'jest'),
    [address],
    { env: { NODE_OPTIONS: '--experimental-vm-modules' } }
  )
}

if (process.argv[1] === (new URL(import.meta.url)).pathname) {
  (async () => {
    let lastExitPromise
    let lastChildProcess

    async function testFlow (fileAddress) {
      if (typeof fileAddress === 'string') {
        if (!checkExtensionTest(fileAddress)) return
      }

      if (
        lastChildProcess &&
        lastChildProcess.exitCode === null &&
        !lastChildProcess.killed
      ) lastChildProcess.kill()

      try { await lastExitPromise } catch (error) {}

      lastExitPromise = test(testsDirectory, fileAddress)

      lastExitPromise.catch(error => {
        if (error instanceof Error) console.error(error)
      })

      lastChildProcess = lastExitPromise.childProcess
    }

    testFlow()

    const watcher = createWatcher(testsDirectory)

    await new Promise(resolve => watcher.once('ready', resolve))

    watcher
      .on('add', testFlow)
      .on('change', testFlow)
  })()
}
