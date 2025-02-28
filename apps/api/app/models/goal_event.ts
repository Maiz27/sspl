import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Match from './match.js'
import Player from './player.js'
import Team from './team.js'
import GoalType from './goal_type.js'

export default class GoalEvent extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare matchId: UUID

  @column()
  declare teamId: UUID

  @column()
  declare minute: number

  @column()
  declare goalTypeId: number

  @column()
  declare scorerId: UUID

  @column()
  declare assistantId: UUID

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

  @belongsTo(() => Player)
  declare scorer: BelongsTo<typeof Player>

  @belongsTo(() => Player)
  declare assistant: BelongsTo<typeof Player>

  @belongsTo(() => GoalType)
  declare goalType: BelongsTo<typeof GoalType>
}
