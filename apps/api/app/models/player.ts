import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'node:crypto'
import PlayerStatus from './player_status.js'
import PlayerPosition from './player_position.js'
import CardEvent from './card_event.js'
import GoalEvent from './goal_event.js'
import OtherEvent from './other_event.js'
import SubstitutionEvent from './substitution_event.js'
import PlayerTeamHistory from './player_team_history.js'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare nickname: string | null

  @column.date()
  declare dateOfBirth: DateTime

  @column()
  declare nationality: string

  @column()
  declare heightCm: number | null

  @column()
  declare weightKg: number | null

  @column()
  declare statusId: number

  @column()
  declare positionId: number

  @column()
  declare photoUrl: string | null

  @column()
  declare biography: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => PlayerStatus)
  declare status: BelongsTo<typeof PlayerStatus>

  @belongsTo(() => PlayerPosition)
  declare position: BelongsTo<typeof PlayerPosition>

  @hasMany(() => GoalEvent, {
    foreignKey: 'scorerId',
  })
  declare goalsScored: HasMany<typeof GoalEvent>

  @hasMany(() => GoalEvent, {
    foreignKey: 'assistantId',
  })
  declare assists: HasMany<typeof GoalEvent>

  @hasMany(() => CardEvent)
  declare cards: HasMany<typeof CardEvent>

  @hasMany(() => SubstitutionEvent, {
    foreignKey: 'playerOutId',
  })
  declare substitutionsOut: HasMany<typeof SubstitutionEvent>

  @hasMany(() => SubstitutionEvent, {
    foreignKey: 'playerInId',
  })
  declare substitutionsIn: HasMany<typeof SubstitutionEvent>

  @hasMany(() => OtherEvent, {
    foreignKey: 'primaryPlayerId',
  })
  declare primaryInEvents: HasMany<typeof OtherEvent>

  @hasMany(() => OtherEvent, {
    foreignKey: 'secondaryPlayerId',
  })
  declare secondaryInEvents: HasMany<typeof OtherEvent>

  @hasMany(() => PlayerTeamHistory)
  declare playerTeamHistories: HasMany<typeof PlayerTeamHistory>
}
