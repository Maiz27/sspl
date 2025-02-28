import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import RefereeRole from './referee_role.js'
import Match from './match.js'
import Referee from './referee.js'

export default class MatchReferee extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare matchId: UUID

  @column()
  declare refereeId: UUID

  @column()
  declare roleId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Match)
  declare match: BelongsTo<typeof Match>

  @belongsTo(() => Referee)
  declare referee: BelongsTo<typeof Referee>

  @belongsTo(() => RefereeRole)
  declare role: BelongsTo<typeof RefereeRole>
}
