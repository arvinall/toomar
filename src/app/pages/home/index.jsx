import { always } from 'ramda'

export const Home = always(<div class='bg-slate-100 text-center'>
  <img src={import.meta.env.BASE_URL + 'toomar.svg'} alt="Toomar logo" />
  <h1>Toomar's Home Page!</h1>
</div>)
