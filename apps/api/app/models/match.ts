import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Season from './season.js'
import Team from './team.js'
import SeasonStatus from './season_status.js'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare seasonId: UUID

  @column()
  declare homeTeamId: UUID

  @column()
  declare awayTeamId: UUID

  @column.dateTime()
  declare matchDate: DateTime

  @column()
  declare homeScore: number

  @column()
  declare awayScore: number

  @column()
  declare statusId: number

  @column()
  declare matchWeek: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @belongsTo(() => Team)
  declare homeTeam: BelongsTo<typeof Team>

  @belongsTo(() => Team)
  declare awayTeam: BelongsTo<typeof Team>

  @belongsTo(() => SeasonStatus)
  declare status: BelongsTo<typeof SeasonStatus>
}
