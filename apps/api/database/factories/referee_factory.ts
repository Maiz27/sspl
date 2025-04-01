import factory from '@adonisjs/lucid/factories'
import Referee from '#models/referee'

export const RefereeFactory = factory
  .define(Referee, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      bio: faker.lorem.paragraph(),
      photoUrl: faker.image.personPortrait(),
    }
  })
  .build()
