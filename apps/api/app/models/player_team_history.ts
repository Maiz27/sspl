import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Player from './player.js'
import Season from './season.js'
import Team from './team.js'

export default class PlayerTeamHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare playerId: UUID

  @column()
  declare teamId: UUID

  @column()
  declare seasonId: UUID

  @column()
  declare startDate: DateTime

  @column()
  declare endDate: DateTime

  @column()
  declare jerseyNumber: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Player)
  declare player: BelongsTo<typeof Player>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>
}
