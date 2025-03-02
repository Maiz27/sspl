import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import Team from '#models/team'

export const TeamFactory = factory
  .define(Team, async ({ faker }) => {
    return {
      name: faker.location.city(),
      shortName: faker.location.city(),
      city: faker.location.city(),
      foundedDate: DateTime.fromJSDate(
        new Date(faker.date.past({ refDate: new Date(2000, 1, 1) }))
      ),
      description: faker.lorem.sentence(),
      logoUrl: faker.image.url({
        width: 500,
        height: 500,
      }),
      website: faker.internet.url(),
      primaryColor: faker.color.rgb.toString(),
      secondaryColor: faker.color.rgb.toString(),
      socialMediaHandles: JSON.stringify(''),
      contactInfo: JSON.stringify(''),
    }
  })
  .build()
