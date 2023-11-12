import { always } from 'ramda'

import { resolvePath } from '../../../utilities'

export const Home = always(
  <div class='min-h-[100dvh] text-center'>
    <div class='absolute top-1/2 w-full translate-y-[-65%]'>
      <img class='inline h-48' src={resolvePath('toomar.svg')} alt="Toomar logo" />

      <h1 class='text-2xl mt-4 font-bold'>Toomar</h1>

      <p class='text-l mt-2 inline-block'>
        Toomar is a functional toolkit that is used to handle progresses in a reactive and declarative way
        <br />
        Useful to animate elements during scrolling by default or creating presentations and etc.
      </p>
    </div>
  </div>
)
