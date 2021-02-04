import LandingPage from '@/views/LandingPage'
import SelectGuild from '@/views/SelectGuild'
import Guild from '@/views/Guild'

export default [
  {
    path: '/',
    name: 'landing-page',
    component: LandingPage
  },
  {
    path: '/select-guild',
    name: 'select-guild',
    component: SelectGuild
  },
  {
    path: '/guild',
    name: 'guild',
    component: Guild
  },
  {
    path: '/*',
    name: 'not-found',
    redirect: '/'
  }
]
