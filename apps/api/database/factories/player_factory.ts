import factory from '@adonisjs/lucid/factories'
import Player from '#models/player'
import { DateTime } from 'luxon'
import PlayerStatus from '#enums/player_status'
import { PlayerTeamHistoryFactory } from './player_team_history_factory.js'

export const PlayerFactory = factory
  .define(Player, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      nickname: faker.word.noun({ length: { min: 4, max: 10 } }),
      dateOfBirth: DateTime.fromJSDate(faker.date.birthdate({ min: 17, max: 45, mode: 'age' })),
      nationality: faker.location.country(),
      heightCm: faker.number.int({ min: 165, max: 220 }),
      weightKg: faker.number.int({ min: 45, max: 90 }),
      photoUrl: faker.image.personPortrait(),
      biography: faker.lorem.paragraph(),
    }
  })
  .state('active', (player) => {
    player.statusId = PlayerStatus.ACTIVE
  })
  .state('injured', (player) => {
    player.statusId = PlayerStatus.INJURED
  })
  .state('suspended', (player) => {
    player.statusId = PlayerStatus.SUSPENDED
  })
  .state('retired', (player) => {
    player.statusId = PlayerStatus.RETIRED
  })
  .relation('playerTeamHistories', () => PlayerTeamHistoryFactory)
  .build()
