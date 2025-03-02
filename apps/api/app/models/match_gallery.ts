import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Match from './match.js'

export default class MatchGallery extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare matchId: UUID

  @column()
  declare title: string | null

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Match)
  declare match: BelongsTo<typeof Match>
}
