import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import Season from '#models/season'
import SeasonStatus from '#enums/season_status'
import { TeamFactory } from './team_factory.js'

export const SeasonFactory = factory
  .define(Season, async ({ faker }) => {
    const startDate = DateTime.fromJSDate(faker.date.past())

    // Generate a random number of months between 6 and 7
    const monthsToAdd = faker.number.int({ min: 6, max: 7 })

    const endDate = startDate.plus({ months: monthsToAdd })

    return {
      startDate,
      endDate,
      championId: null,
    }
  })
  .state('active', (season, { faker }) => {
    const startDate = DateTime.fromJSDate(faker.date.past())

    const monthsToAdd = faker.number.int({ min: 6, max: 7 })
    const endDate = startDate.plus({ months: monthsToAdd })

    // Ensure end date is in the future (for active seasons)
    const now = DateTime.now()
    season.startDate = startDate
    season.endDate = endDate < now ? now.plus({ months: 2 }) : endDate
    season.statusId = SeasonStatus.ACTIVE
  })
  .state('upcoming', (season, { faker }) => {
    const startDate = DateTime.fromJSDate(faker.date.future())

    const monthsToAdd = faker.number.int({ min: 6, max: 7 })
    const endDate = startDate.plus({ months: monthsToAdd })

    season.startDate = startDate
    season.endDate = endDate
    season.statusId = SeasonStatus.UPCOMING
  })
  .state('completed', (season, { faker }) => {
    const endDate = DateTime.fromJSDate(faker.date.past())

    const monthsToSubtract = faker.number.int({ min: 6, max: 7 })
    const startDate = endDate.minus({ months: monthsToSubtract })

    season.startDate = startDate
    season.endDate = endDate
    season.statusId = SeasonStatus.COMPLETED
  })
  .relation('champion', () => TeamFactory)
  .build()
