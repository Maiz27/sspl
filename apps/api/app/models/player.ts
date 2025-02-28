import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PlayerStatus from './player_status.js'
import Team from './team.js'
import PlayerPosition from './player_position.js'
import type { UUID } from 'node:crypto'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare nickname: string | null

  @column()
  declare dateOfBirth: DateTime

  @column()
  declare nationality: string

  @column()
  declare heightCm: number | null

  @column()
  declare weightKg: number | null

  @column()
  declare statusId: number

  @column()
  declare teamId: UUID

  @column()
  declare positionId: number

  @column()
  declare jerseyNumber: number | null

  @column()
  declare photoUrl: string | null

  @column()
  declare biography: string | null

  @column()
  declare contractStartDate: DateTime | null

  @column()
  declare contractEndDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => PlayerStatus)
  declare status: BelongsTo<typeof PlayerStatus>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @belongsTo(() => PlayerPosition)
  declare position: BelongsTo<typeof PlayerPosition>
}
