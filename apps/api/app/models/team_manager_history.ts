import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Manager from './manager.js'
import Team from './team.js'

export default class TeamManagerHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare teamId: UUID

  @column()
  declare managerId: UUID

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @belongsTo(() => Manager)
  declare manager: BelongsTo<typeof Manager>
}
