import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'

export default class TeamMatchStatistic extends BaseModel {
  @column()
  declare matchId: UUID

  @column()
  declare teamId: UUID

  @column()
  declare possessionPercentage: number

  @column()
  declare passesTotal: number

  @column()
  declare passesCompleted: number

  @column()
  declare shotsTotal: number

  @column()
  declare shotsOnTarget: number

  @column()
  declare corners: number

  @column()
  declare fouls: number

  @column()
  declare offsides: number

  @column()
  declare yellowCards: number

  @column()
  declare redCards: number

  @column()
  declare goalsScored: number

  @column()
  declare goalsAgainst: number
}
