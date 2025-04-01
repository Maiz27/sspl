/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const MatchesController = () => import('#controllers/matches_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    // Standard CRUD routes
    router.resource('matches', MatchesController)

    // Additional match-specific routes
    router.get('matches/:id/score', [MatchesController, 'getScore'])
    router.get('matches/:id/timeline', [MatchesController, 'getTimeline'])
  })
  .prefix('api/v1')
