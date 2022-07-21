import {
  testsDirectory,
  createWatcher
} from './utils.js'
import {
  checkExtensionFormat,
  format
} from './format-script.js'
import {
  checkExtensionTest,
  test
} from './test-script.js'

const {
  URL,
  Promise,
  Error,

  process,
  console
} = globalThis

export function devTest (fileAddress) {
  const formatArguments = []

  if (typeof fileAddress === 'string') {
    if (checkExtensionFormat(fileAddress)) {
      formatArguments.push(testsDirectory, fileAddress)
    }
  }

  const formatExitPromise = format(...formatArguments)

  formatExitPromise.catch(error => {
    if (error instanceof Error) console.error(error)
  })

  const formatChildProcess = formatExitPromise.childProcess

  const devObject = {
    formatExitPromise: undefined,
    formatChildProcess,

    testExitPromise: undefined,
    testChildProcess: undefined
  }

  devObject.formatExitPromise = formatExitPromise.finally(() => {
    devObject.testExitPromise = test(testsDirectory, fileAddress)

    devObject.testExitPromise.catch(error => {
      if (error instanceof Error) console.error(error)
    })

    devObject.testChildProcess = devObject.testExitPromise.childProcess
  })

  return devObject
}

if (process.argv[1] === (new URL(import.meta.url)).pathname) {
  (async () => {
    let lastFormatExitPromise
    let lastFormatChildProcess

    let lastTestExitPromise
    let lastTestChildProcess

    async function devTestFlow (fileAddress) {
      if (typeof fileAddress === 'string') {
        if (
          !checkExtensionFormat(fileAddress) ||
          !checkExtensionTest(fileAddress)
        ) return
      }

      if (
        lastFormatChildProcess &&
        lastFormatChildProcess.exitCode === null &&
        !lastFormatChildProcess.killed
      ) return

      if (
        lastTestChildProcess &&
        lastTestChildProcess.exitCode === null &&
        !lastTestChildProcess.killed
      ) lastTestChildProcess.kill()

      try { await lastTestExitPromise } catch (error) {}

      await (async devObject => {
        lastFormatExitPromise = devObject.formatExitPromise
        lastFormatChildProcess = devObject.formatChildProcess

        try {
          await lastFormatExitPromise.finally(() => {
            lastTestExitPromise = devObject.TestExitPromise
            lastTestChildProcess = devObject.TestChildProcess
          })
        } catch (error) {
          if (error instanceof Error) console.error(error)
        }
      })(devTest(fileAddress))
    }

    devTestFlow()

    const watcher = createWatcher(testsDirectory)

    await new Promise(resolve => watcher.once('ready', resolve))

    watcher
      .on('add', devTestFlow)
      .on('change', devTestFlow)
  })()
}
