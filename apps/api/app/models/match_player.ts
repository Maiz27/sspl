import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Match from './match.js'
import Player from './player.js'
import Team from './team.js'

export default class MatchPlayer extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare matchId: UUID

  @column()
  declare teamId: UUID

  @column()
  declare playerId: UUID

  @column()
  declare isStarter: boolean

  @column()
  declare minuteIn: number | null

  @column()
  declare minuteOut: number | null

  @column()
  declare minutesPlayed: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Match)
  declare match: BelongsTo<typeof Match>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @belongsTo(() => Player)
  declare player: BelongsTo<typeof Player>
}
