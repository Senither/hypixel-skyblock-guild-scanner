import LandingPage from '@/views/LandingPage'
import SelectGuild from '@/views/SelectGuild'
import ScanGuild from '@/views/ScanGuild'

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
    path: '/scanning',
    name: 'scan-guild',
    component: ScanGuild
  },
  {
    path: '/*',
    name: 'not-found',
    redirect: '/'
  }
]
