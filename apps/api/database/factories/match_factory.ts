import factory from '@adonisjs/lucid/factories'
import Match from '#models/match'
import { DateTime } from 'luxon'

export const MatchFactory = factory
  .define(Match, async ({ faker }) => {
    return {
      matchDate: DateTime.fromJSDate(faker.date.future()),
      matchWeek: faker.number.int({ min: 1, max: 35 }),
    }
  })
  .build()
