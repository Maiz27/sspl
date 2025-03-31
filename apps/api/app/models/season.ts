import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'node:crypto'
import SeasonStatus from './season_status.js'
import Team from './team.js'
import PlayerTeamHistory from './player_team_history.js'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column()
  declare statusId: number

  @column()
  declare championId: UUID | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => SeasonStatus)
  declare status: BelongsTo<typeof SeasonStatus>

  @belongsTo(() => Team, { foreignKey: 'championId' })
  declare champion: BelongsTo<typeof Team>

  @hasMany(() => PlayerTeamHistory)
  declare playerTeamHistories: HasMany<typeof PlayerTeamHistory>
}
