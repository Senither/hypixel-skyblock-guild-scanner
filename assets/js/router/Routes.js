import LandingPage from '@/views/LandingPage'

export default [
  {
    path: '/',
    name: 'landing-page',
    component: LandingPage,
  },
  {
    path: '/*',
    name: 'not-found',
    redirect: '/',
  }
]
