import { DateTime } from 'luxon'
import factory from '@adonisjs/lucid/factories'
import PlayerTeamHistory from '#models/player_team_history'
import { PlayerFactory } from './player_factory.js'
import { TeamFactory } from './team_factory.js'
import { SeasonFactory } from './season_factory.js'

export const PlayerTeamHistoryFactory = factory
  .define(PlayerTeamHistory, async ({ faker }) => {
    const startDate = DateTime.fromJSDate(faker.date.past())
    const endDate = startDate.plus({ years: Math.floor(Math.random() * 4) })

    return {
      startDate,
      endDate,
      jerseyNumber: faker.number.int({ min: 1, max: 99 }),
    }
  })
  .relation('player', () => PlayerFactory)
  .relation('team', () => TeamFactory)
  .relation('season', () => SeasonFactory)
  .build()
