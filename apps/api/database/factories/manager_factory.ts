import factory from '@adonisjs/lucid/factories'
import Manager from '#models/manager'
import { DateTime } from 'luxon'
import { TeamManagerHistoryFactory } from './team_manager_history_factory.js'

export const ManagerFactory = factory
  .define(Manager, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: DateTime.fromJSDate(faker.date.birthdate({ min: 35, max: 60, mode: 'age' })),
      nationality: faker.location.country(),
      photoUrl: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
    }
  })
  .relation('teamManagerHistories', () => TeamManagerHistoryFactory)
  .build()
