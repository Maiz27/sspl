import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import MatchReferee from './match_referee.js'

export default class Referee extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare bio: string

  @column()
  declare photoUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => MatchReferee)
  declare matchReferees: HasMany<typeof MatchReferee>
}
