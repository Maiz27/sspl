import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import EventType from './event_type.js'
import Match from './match.js'
import Player from './player.js'
import Team from './team.js'

export default class OtherEvent extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare matchId: UUID

  @column()
  declare teamId: UUID

  @column()
  declare minute: number

  @column()
  declare eventTypeId: number

  @column()
  declare primaryPlayerId: UUID | null

  @column()
  declare secondaryPlayerId: UUID | null

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Match)
  declare match: BelongsTo<typeof Match>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @belongsTo(() => EventType)
  declare eventType: BelongsTo<typeof EventType>

  @belongsTo(() => Player, {
    foreignKey: 'primaryPlayerId',
  })
  declare primaryPlayer: BelongsTo<typeof Player>

  @belongsTo(() => Player, {
    foreignKey: 'secondaryPlayerId',
  })
  declare secondaryPlayer: BelongsTo<typeof Player>
}
