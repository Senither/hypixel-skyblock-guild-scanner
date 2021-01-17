import LandingPage from '@/views/LandingPage'
import SelectGuild from '@/views/SelectGuild'

export default [
  {
    path: '/',
    name: 'landing-page',
    component: LandingPage,
  },
  {
    path: '/select-guild',
    name: 'select-guild',
    component: SelectGuild,
  },
  {
    path: '/*',
    name: 'not-found',
    redirect: '/',
  },
]
