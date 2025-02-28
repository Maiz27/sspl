import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Match from './match.js'
import Player from './player.js'
import Team from './team.js'

export default class SubstitutionEvent extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare matchId: UUID

  @column()
  declare teamId: UUID

  @column()
  declare minute: number

  @column()
  declare playerInId: UUID

  @column()
  declare playerOutId: UUID

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Match)
  declare match: BelongsTo<typeof Match>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @belongsTo(() => Player, {
    foreignKey: 'playerOutId',
  })
  declare playerOut: BelongsTo<typeof Player>

  @belongsTo(() => Player, {
    foreignKey: 'playerInId',
  })
  declare playerIn: BelongsTo<typeof Player>
}
