import factory from '@adonisjs/lucid/factories'
import TeamManagerHistory from '#models/team_manager_history'
import { DateTime } from 'luxon'
import { ManagerFactory } from './manager_factory.js'
import { TeamFactory } from './team_factory.js'

export const TeamManagerHistoryFactory = factory
  .define(TeamManagerHistory, async ({ faker }) => {
    const startDate = DateTime.fromJSDate(faker.date.past())
    const endDate = startDate.plus({ years: Math.floor(Math.random() * 4) })
    return {
      startDate,
      endDate,
    }
  })
  .relation('manager', () => ManagerFactory)
  .relation('team', () => TeamFactory)
  .build()
