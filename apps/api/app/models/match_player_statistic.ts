import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'

export default class MatchPlayerStatistic extends BaseModel {
  @column()
  declare playerId: UUID

  @column()
  declare matchId: UUID

  @column()
  declare teamId: UUID

  @column()
  declare minutesPlayed: number

  @column()
  declare goals: number

  @column()
  declare assists: number

  @column()
  declare yellowCards: number

  @column()
  declare redCards: number

  @column()
  declare shots: number

  @column()
  declare shotsOnTarget: number

  @column()
  declare foulsCommitted: number

  @column()
  declare foulsSuffered: number
}
