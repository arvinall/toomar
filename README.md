<p align="center">
  <img src="https://toomar.js.org/toomar.svg" alt="toomar-logo" width="96" height="96" />
</p>

<h1 align="center">Toomar</h1>

<br />

<p align="center">
  Toomar is a functional toolkit that is used to handle progresses in a reactive and declarative way
  <br />
  Useful to animate elements during scrolling by default or creating presentations and etc.
  <br />
</p>

<p align="center">
  <a href="https://toomar.js.org">toomar.js.org</a>
  •
  <a href="https://toomar.js.org/docs">API Reference</a>
</p>

<p align="center">
  <a href="https://github.com/arvinall/toomar/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/arvinall/toomar" alt="toomar-license" />
  </a>
  <a href="https://github.com/arvinall/toomar/releases">
    <img src="https://img.shields.io/github/package-json/v/arvinall/toomar?logo=github" alt="toomar-package-version" />
  </a>
  <a href="https://www.npmjs.com/package/toomar">
    <img src="https://img.shields.io/npm/v/toomar?logo=npm" alt="toomar-npm-version" />
  </a>
  <img src="https://img.shields.io/npm/dt/toomar" alt="toomar-downloads" />
</p>

<p align="center">Toomar (طومار) is the scroll equivalent in Persian</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Browser or Node](#browser-or-node)
- [Usage](#usage)
  - [Browser](#browser)
  - [Node](#node)
  - [Deno](#deno)
- [Overview](#overview)
- [Examples](#examples)
  - [Most minimum usage](#most-minimum-usage)
  - [More real usage](#more-real-usage)
  - [Multi-Axes ranges](#multi-axes-ranges)
- [Concepts](#concepts)
  - [listen](#listen)
  - [Configs](#configs)
  - [Locators](#locators)
  - [Transformers](#transformers)
  - [Schedulers](#schedulers)
  - [Units](#units)
  - [Operators](#operators)
  - [Filters](#filters)
- [Contribution](#contribution)
  - [Code Style](#code-style)
  - [Set up](#set-up)
- [Thanks To](#thanks-to)
- [Support](#support)
  - [Share In Social Media](#share-in-social-media)
  - [Donation](#donation)
- [License](#license)

## Installation
All you need to do for using Toomar is a package manager that use [npm registry][toomar npm]

Toomar is a cross-environment package, therefor you can use Toomar in Browser, Deno and Node etc …

### Browser or Node
Install Toomar as a dependency with your preferred tool

```bash
npm add toomar
```

## Usage
You can import all the Toomar's API standalones directly

### Browser
```js
// With bundler
import { listen, to } from 'toomar'

// OR without bundler (not recommended)
import {
  listen, to, auditAnimationFrames, fractionOf
} from './node_modules/toomar/build/toomar.esm.min.js'
```

### Node
Since [globalThis][globalThis] is not an instance of [EventTarget][EventTarget],
you should assign it before using Toomar

```js
// set-event-target-to-global-this.js

export const globalEventTarget = new EventTarget()

Object.setPrototypeOf(globalThis, globalEventTarget)
```

Then import it just before Toomar

```js
import './set-event-target-to-global-this.js'

import { listen, to } from 'toomar'

// OR (not recommended)
import {
  listen, to, auditAnimationFrames, fractionOf
} from 'toomar/build/toomar.esm.min.js'
```

### Deno
```js
import { listen, to, auditAnimationFrames, fractionOf } from 'npm:toomar@1'
```

## Overview
Toomar contains sets of standalone functions which help you solve your problems.

All of the functions that required more than one argument are [curried][Why Curry Helps] by default,
for example you can use [percent][percent] **Unit** in two different ways:

```js
import { from, percent } from 'toomar'

// With two argument
from(percent(() => window.innerHeight, 100))

// Or with one argument now and pass second argument later
const percentOfInnerHeight = percent(() => window.innerHeight)

from(percentOfInnerHeight(150))
```

And all of the functions that required values, for example [topOf][topOf] **Locator** that accepts [HTMLElement][HTMLElement], [em][em] **Unit** or [divide][divide] **Operator** that accepts `number`, has two signature, it can be a **Function** or **not a Function**, so your ranges can be responsive:

```js
import { from, px } from 'toomar'

from(px(600)) // --> Its value is always 600

let variableNumber = 600

from(px(() => variableNumber)) // --> Its value is variable based on variableNumber
```

All of the functions that accepts `number` to define ranges pass it to [px][px] **Unit** by default, so you don't need that unit

## Examples
### Most minimum usage
In this example we are trying to listen to the scroll event
and set its position to the document title,
just when scroll position is between `0` and `600`

```js
import { listen, config, to } from 'toomar'

const subscriber = listen(config(to(600)))
  .subscribe(({ y }) => (document.title = `ScrollY: ${y}`))
```

### More real usage
In this example we are trying to listen to the scroll event
and animate elements based on scroll position,
just when `section1` element is in the viewport with `250px` distance

```js
import {
  listen, config, from, subtract,
  topOf, to, add, bottomOf,
  auditAnimationFrame, direction, fractionOf
} from 'toomar'

const section1 = document.querySelector('.section1')
const section1Title = section1.querySelector('.section1__title')
const section1Icon = section1.querySelector('.section1__icon')

const subscriber = listen(config(
  from(subtract(topOf(section1), 250)),
  to(add(bottomOf(section1), 250))
)).pipe(
  auditAnimationFrame(),
  direction(),
  fractionOf(1),
  fractionOf(90)
).subscribe(({ direction, fractionOf: { 1: opacity, 90: rotation } }) => {
  section1.dataset.theme = ['light', 'dark'][direction]
  section1Title.style.opacity = opacity
  section1Icon.style.transform = `rotate(${rotation}deg)`
})
```

### Multi-Axes ranges
In this example we are trying to listen to the scroll event
and set its positions to the document title,
just when scroll position in the **Y axis** is between `0` and `650`
and **X axis** is between `650` and `1300`

```js
import { listen, config, to, fromX, toX } from 'toomar'

const subscriber = listen(
  config(to(650), fromX(650), toX(650 * 2))
).subscribe(({ y, x }) => (document.title = `ScrollY: ${y}, ScrollX: ${x}`))
```

## Concepts
### listen
The main tool that spy the source of the scroll is the [listen][listen]

[listen][listen] accepts one `configs` argument and returns an [RxJS Observable][RxJS Observable]

With this tool you can specify your target range and do whatever you want just when needed

### Configs
`configs` are used to provide [listen][listen]'s config

* [config][config]: is used to merge configs and set defaults
* [to/toY][to], [from/fromY][from], [toX][toX], [fromX][fromX]: is used to specify ranges
* [scroll][scroll], [touchScroll][touchScroll]: is used to define source of the scroll
* [strictBoundaries][strictBoundaries], [looseBoundaries][looseBoundaries]: is used to define how [listen][listen] should handle the boundaries
* [coverEdges][coverEdges], [uncoverEdges][uncoverEdges]: is used to define how [listen][listen] should cover the edges when it escapes the ranges
* [cleanEdges][cleanEdges], [uncleanEdges][uncleanEdges]: is used to define how [listen][listen] should clean the edges when it crosses the ranges

### Locators
`locators` are used to locate things easier in viewport

* [maxScroll/maxScrollY][maxScroll], [maxScrollX][maxScrollX]: are used to provide the scrolling maximum position
* [topOf][topOf], [bottomOf][bottomOf], [leftOf][leftOf], [rightOf][rightOf]: provide an element position based on viewport

### Transformers
`transformers` are used to provide data that is useful for your problem

* [fractionOf/fractionYOf][fractionOf], [fractionXOf][fractionXOf]: is used to convert scroll position to a value that fits your needs
* [direction/directionOfY][direction], [directionOfX][directionOfX]: provides scroll direction

### Schedulers
`schedulers` are used to manage your subscriber call time

* [auditAnimationFrame][auditAnimationFrame]: is used to run your subscriber in the [requestAnimationFrame][requestAnimationFrame] loop

### Units
`units` are used to define the [listen][listen]'s range in the **CSS** way

* [em][em], [percent][percent], [px][px]: is used to make relation between ranges

### Operators
`operators` are used to do the math operations on `units`

* [add][add], [subtract][subtract], [multiply][multiply], [divide][divide]: are used to make relation between units

### Filters
`filters` are used to filter [listen][listen]'s observable

* [filterOutDuplicates][filterOutDuplicates], [filterOutXDuplicates][filterOutXDuplicates]: are used when document, scrolls in multiple axes but you want to get fired just when scroll happens in your desired axis

## Contribution
Toomar is open source and we appreciate [issue reports][Issues] and [pull requests][Pulls]

Please read and follow our [Code of Conduct][Code of Conduct]

* Commits must be signed-off
* Pull requests must contains implementation in JS, declaration in TS, documentation in TSDoc and test in Jest
* Test coverage must be 100% all the time

### Code Style
Toomar follows [JavaScript Standard Style][JavaScript Standard Style], with few points worth to note:

1. Imperative is preferred over declarative when it is in a loop that affects performance
2. No any side-effect or impure functions at all
3. Name functions that mutate local states clearly with `mutate`
4. Prefer longer, more descriptive names, over shorter names. For most variables, minification means we don't pay for extra characters in production
5. Implement in JavaScript and declare its inputs and output in TypeScript
6. All of the functions that required more than one argument must be [curried][Why Curry Helps]
7. All of the values that might change regularly must be accepted as both function and non-function

### Set up
Toomar developed with [Node.js][Node.js] tools

Initialize:
```bash
git clone git@github.com:arvinall/toomar.git && cd toomar && npm i
```

Bundle:
```bash
# Bundle in ESM and IIFE with both minification and non-minification formats and declarations references
npm run build
```
> There are more specific scripts to bundle in just one of these formats, visit [package.json][package.json] for more

Test:
```bash
# One-Time test all of the functions
npm test

# Watch and test changed codes
npm run dev:test
```

API References:
```bash
# Generate and serve
npm run docs

# Generate
npm run docs:generate

# Serve
npm run docs:serve
```

Linting:
```bash
# One-Time lint all of the functions
npm run lint

# One-Time lint all of the scripts
npm run lint:scripts
```

Formatting:
```bash
# One-Time format all of the functions
npm run format

# Watch and format changed codes
npm run dev:format

# One-Time format all of the scripts
npm run format:scripts

# Watch and format changed scripts
npm run dev:format:scripts
```

## Thanks To
* [**Amin Ghanbari «امین قنبری»**](https://www.behance.net/aminghanbari) For Toomar's Logo Illustration And Motion Graphic
* [**Mahdi Yousefi «مهدی یوسفی»**](https://www.behance.net/mahdiyf) For Help To Convert Toomar's Logo Motion Graphic To LottieFile
* [**Melika Soheili «ملیکا سهیلی»**](https://github.com/msrd4) For Editing [Toomar's Website][Toomar] Content and Readme

## Support
### Share In Social Media
Support Toomar by sharing your thoughts and making creative projects

[![Twitter](https://img.shields.io/badge/Twitter-%23FFFFFF.svg?logo=X&logoColor=black)](https://twitter.com/intent/tweet?text=Toomar%0AFunctional%20toolkit%20that%20used%20to%20handle%20progresses%20in%20a%20reactive%20and%20declarative%20way%0Ahttps%3A//toomar.js.org)
[![LinkedIn](https://img.shields.io/badge/Linkedin-%23FFFFFF.svg?logo=linkedin&logoColor=0077B5)](https://www.linkedin.com/shareArticle?mini=true&url=https%3A//toomar.js.org)
[![Facebook](https://img.shields.io/badge/Facebook-%23FFFFFF.svg?logo=Facebook&logoColor=1877F2)](https://www.facebook.com/sharer/sharer.php?u=https%3A//toomar.js.org)
[![Telegram](https://img.shields.io/badge/Telegram-FFFFFF?logo=telegram&logoColor=2CA5E0)](https://t.me/share/url?url=https%3A//toomar.js.org&text=Toomar%0AFunctional%20toolkit%20that%20used%20to%20handle%20progresses%20in%20a%20reactive%20and%20declarative%20way)

### Donation
Support Toomar via donation by Iranian Rial or Cryptocurrencies

[![Iranian Rial](https://img.shields.io/badge/Iranian_Rial-FFFFFF?logo=contactlesspayment&logoColor=3FA6EB)](https://idpay.ir/arvinall)
<strong style="vertical-align: top;">Iranian Rial payment gateway</strong>

[![Bitcoin](https://img.shields.io/badge/Bitcoin-FFFFFF?logo=bitcoin&logoColor=#F7931A)](https://btcscan.org/address/bc1qj7tjaw3r9lhqpfjwgt6d4w2f9dulu4fel38m8m)
<strong style="vertical-align: top;">Send only Bitcoin (BTC) to this address</strong>
<details>
  <summary><strong>Bitcoin (BTC) Wallet QR Code</strong></summary>
  <img src="https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&amp;address=bc1qj7tjaw3r9lhqpfjwgt6d4w2f9dulu4fel38m8m" height="225" width="225" border="0" alt="Bitcoin QR code" title="bitcoin:bc1qj7tjaw3r9lhqpfjwgt6d4w2f9dulu4fel38m8m" />
</details>

[![Ethereum](https://img.shields.io/badge/Ethereum-FFFFFF?logo=Ethereum&logoColor=1C1CFF)](https://etherscan.io/address/0x345790627852D30A609011398C6C02ccb5F0D6A5)
<strong style="vertical-align: top;">Send only Ethereum (ETH-ERC20), Tether (USDT-ERC20), PAX Gold (PAXG-ERC20), Gold Tether (XAUT-ERC20) to this address</strong>
<details>
  <summary><strong>Ethereum (ETH-ERC20) Wallet QR Code</strong></summary>
  <img src="https://www.bitcoinqrcodemaker.com/api/?style=ethereum&amp;address=0x345790627852D30A609011398C6C02ccb5F0D6A5" height="225" width="225" border="0" alt="Ethereum QR code" title="ethereum:0x345790627852D30A609011398C6C02ccb5F0D6A5" />
</details>

[![BNB-BEP20](https://img.shields.io/badge/BNB_BEP20-FFFFFF?logo=binance&logoColor=F0B90B)](https://bscscan.com/address/0x345790627852D30A609011398C6C02ccb5F0D6A5)
<strong style="vertical-align: top;">
  Send only BNB Smart Chain (BNB-BEP20), Tether USD (USDT-BEP20), Wrapped TON Coin (TONCOIN-BEP20), Binance-Peg PAX Gold (PAXG-BEP20) to this address
</strong>

[![TRX-TRC20](https://img.shields.io/badge/TRX_TRC20-FFFFFF?logo=Ethereum&logoColor=C63127)](https://tronscan.io/#/address/TXKZL7KZbMES476ALxLzhwefUCf27Gk4uY)
<strong style="vertical-align: top;">Send only Tron (TRX-TRC20), Tether (USDT-TRC20) to this address</strong>

## License
MIT © [Arvin Ladan «آروین لادن»][Website], see [LICENSE][LICENSE] file

[API References]: # (Main)

[listen]: https://toomar.js.org/docs/functions/listen.html

[API References]: # (Configs)

[config]: https://toomar.js.org/docs/functions/config.html
[to]: https://toomar.js.org/docs/functions/toY.html
[from]: https://toomar.js.org/docs/functions/fromY.html
[toX]: https://toomar.js.org/docs/functions/toX.html
[fromX]: https://toomar.js.org/docs/functions/fromX.html
[scroll]: https://toomar.js.org/docs/functions/scroll.html
[touchScroll]: https://toomar.js.org/docs/functions/touchScroll.html
[strictBoundaries]: https://toomar.js.org/docs/functions/strictBoundaries.html
[looseBoundaries]: https://toomar.js.org/docs/functions/looseBoundaries.html
[coverEdges]: https://toomar.js.org/docs/functions/coverEdges.html
[uncoverEdges]: https://toomar.js.org/docs/functions/uncoverEdges.html
[cleanEdges]: https://toomar.js.org/docs/functions/cleanEdges.html
[uncleanEdges]: https://toomar.js.org/docs/functions/uncleanEdges.html

[API References]: # (Locators)

[maxScroll]: https://toomar.js.org/docs/functions/maxScrollY.html
[maxScrollX]: https://toomar.js.org/docs/functions/maxScrollX.html
[topOf]: https://toomar.js.org/docs/functions/topOf.html
[bottomOf]: https://toomar.js.org/docs/functions/bottomOf.html
[leftOf]: https://toomar.js.org/docs/functions/leftOf.html
[rightOf]: https://toomar.js.org/docs/functions/rightOf.html

[API References]: # (Transformers)

[fractionOf]: https://toomar.js.org/docs/functions/fractionYOf.html
[fractionXOf]: https://toomar.js.org/docs/functions/fractionXOf.html
[direction]: https://toomar.js.org/docs/functions/directionOfY.html
[directionOfX]: https://toomar.js.org/docs/functions/directionOfX.html

[API References]: # (Schedulers)

[auditAnimationFrame]: https://toomar.js.org/docs/functions/auditAnimationFrame.html

[API References]: # (Units)

[em]: https://toomar.js.org/docs/functions/em.html
[percent]: https://toomar.js.org/docs/functions/percent.html
[px]: https://toomar.js.org/docs/functions/px.html

[API References]: # (Operators)

[add]: https://toomar.js.org/docs/functions/add.html
[subtract]: https://toomar.js.org/docs/functions/subtract.html
[multiply]: https://toomar.js.org/docs/functions/multiply.html
[divide]: https://toomar.js.org/docs/functions/divide.html

[API References]: # (Filters)

[filterOutDuplicates]: https://toomar.js.org/docs/functions/filterOutYDuplicates.html
[filterOutXDuplicates]: https://toomar.js.org/docs/functions/filterOutXDuplicates.html

[Personal References]: # (Contacts)

[Website]: https://arvinall.github.io
[Email]: mailto:arvinall021@gmail.com?subject=Toomar%20Readme
[X]: https://twitter.com/ArvinLadan
[Linkedin]: https://www.linkedin.com/in/arvinall
[Instagram]: https://www.instagram.com/arvinall

[General References]: #

[Toomar]: https://toomar.js.org

[Toomar npm]: https://www.npmjs.com/package/toomar

[Pulls]: https://github.com/arvinall/toomar/pulls
[Issues]: https://github.com/arvinall/toomar/issues

[package.json]: https://github.com/arvinall/toomar/blob/main/package.json
[Code of Conduct]: https://github.com/arvinall/toomar/blob/main/CODE_OF_CONDUCT.md
[LICENSE]: https://github.com/arvinall/toomar/blob/main/LICENSE

[External References]: # (Contacts)

[globalThis]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
[EventTarget]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
[HTMLElement]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[requestAnimationFrame]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

[Why Curry Helps]: https://hughfdjackson.com/javascript/why-curry-helps

[RxJS Observable]: https://rxjs.dev/guide/observable

[JavaScript Standard Style]: https://standardjs.com

[Node.js]: https://nodejs.org
