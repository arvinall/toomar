import path from 'path'
import { watch } from 'chokidar'
import { spawn } from 'child_process'
import chalk from 'chalk'

const {
  URL,
  Promise,
  Object,
  Array,

  console,
  process
} = globalThis

// Paths
/** @type {string} */
export const rootDirectory = path.resolve(
  (new URL(import.meta.url)).pathname,
  '..',
  '..'
)

/** @type {string} */
export const localNpmBinaries = path.resolve(
  rootDirectory,
  'node_modules',
  '.bin'
)

/** @type {string} */
export const srcDirectory = path.resolve(rootDirectory, 'lib')

/** @type {string} */
export const testsDirectory = path.resolve(rootDirectory, 'tests')

/** @type {string} */
export const distDirectory = path.resolve(rootDirectory, 'build')

/**
 * Create watcher
 *
 * Same as chokidar watch method
 *
 * @see {@link https://github.com/paulmillr/chokidar#api Chokidar API}
 */
export function createWatcher (address, options = {}) {
  return watch(address, {
    cwd: rootDirectory,
    ...options
  })
}

/**
 * Run process and pipe its output and resolve after execution
 *
 * @param {string} name Process name
 * @param {string} command
 * @param {string[]} args
 * @param {object} spawnOptions {@link https://nodejs.org/dist/latest-v14.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options spawn}
 *
 * @returns {Promise}
 */
export function spawnHere (title, command, args = [], spawnOptions = {}) {
  if (
    typeof spawnOptions === 'object' &&
    typeof spawnOptions.env !== 'object'
  ) spawnOptions.env = {}

  const titles = title.split(',').map(title => title.trim())

  const name = titles[0]
  const fileAddress = titles[1]

  let logText = chalk.whiteBright(name)

  if (typeof fileAddress === 'string') logText += ' ' + chalk.white(fileAddress)

  console.log(chalk.bgGray(logText))

  const childProcess = spawn(command, args, {
    cwd: rootDirectory,
    stdio: ['ignore', 'inherit', 'inherit'],
    ...spawnOptions,
    env: {
      ...process.env,
      ...spawnOptions?.env
    }
  })

  const exitPromise = new Promise(
    (resolve, reject) => childProcess.once('exit', code => {
      const logBackgroundColor = code === 0 ? 'Green' : 'Magenta'

      console.log(`${chalk[`bg${logBackgroundColor}`](chalk.whiteBright(name))}\n`)

      if (code === 0) resolve()
      else reject() // eslint-disable-line prefer-promise-reject-errors
    })
  )

  Object.defineProperty(exitPromise, 'childProcess', {
    value: childProcess
  })

  return exitPromise
}

/**
 * Check file extension
 *
 * @param {string} fileAddress
 * @param {Array.<string|string[]>} includes
 * @param {Array.<string|string[]>} excludes
 *
 * @returns {boolean}
 */
export function checkExtension (fileAddress, includes = [], excludes = []) {
  const multiIncludes = includes.filter(extension => extension instanceof Array)
  const multiExcludes = excludes.filter(extension => extension instanceof Array)

  includes = includes.filter(extension => typeof extension === 'string')
  excludes = excludes.filter(extension => typeof extension === 'string')

  const extensions = path.basename(fileAddress).split('.').slice(1)

  let singleIncludePass = true
  let singleExcludePass = true

  let multiIncludesPass = true
  let multiExcludesPass = true

  if (includes.length > 0) {
    for (const extension of includes) {
      singleIncludePass = extensions.includes(extension)

      if (singleIncludePass) break
    }
  }

  if (excludes.length > 0) {
    for (const extension of excludes) {
      singleExcludePass = !extensions.includes(extension)

      if (!singleExcludePass) break
    }
  }

  if (multiIncludes.length > 0) {
    for (const includes of multiIncludes) {
      multiIncludesPass = includes.filter(
        extension => !extensions.includes(extension)
      ).length === 0

      if (multiIncludesPass) break
    }
  }

  if (multiExcludes.length > 0) {
    for (const excludes of multiExcludes) {
      multiExcludesPass = excludes.filter(
        extension => !extensions.includes(extension)
      ).length !== 0

      if (!multiExcludesPass) break
    }
  }

  return (
    singleIncludePass &&
    singleExcludePass &&
    multiIncludesPass &&
    multiExcludesPass
  )
}
