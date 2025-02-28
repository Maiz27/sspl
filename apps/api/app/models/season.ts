import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import SeasonStatus from './season_status.js'
import Team from './team.js'
import type { UUID } from 'node:crypto'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare slug: string

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column()
  declare statusId: number

  @column()
  declare championshipId: UUID | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => SeasonStatus)
  declare status: BelongsTo<typeof SeasonStatus>

  @belongsTo(() => Team)
  declare championship: BelongsTo<typeof Team>
}
