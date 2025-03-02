import factory from '@adonisjs/lucid/factories'
import Manager from '#models/manager'
import { DateTime } from 'luxon'

export const ManagerFactory = factory
  .define(Manager, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: DateTime.fromJSDate(faker.date.birthdate()),
      nationality: faker.location.country(),
      photoUrl: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
    }
  })
  .build()
