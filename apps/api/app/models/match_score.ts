import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'

export default class MatchScore extends BaseModel {
  @column()
  declare matchId: UUID

  @column()
  declare homeTeamId: UUID

  @column()
  declare awayTeamId: UUID

  @column()
  declare homeScore: number

  @column()
  declare awayScore: number
}
