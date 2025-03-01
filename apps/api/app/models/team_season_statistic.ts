import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'

export default class TeamSeasonStatistic extends BaseModel {
  @column()
  declare teamId: UUID

  @column()
  declare seasonId: UUID

  @column()
  declare matchesPlayed: number

  @column()
  declare wins: number

  @column()
  declare draws: number

  @column()
  declare losses: number

  @column()
  declare goalsScored: number

  @column()
  declare goalsAgainst: number
}
