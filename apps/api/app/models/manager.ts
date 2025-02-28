import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import TeamManagerHistory from './team_manager_history.js'

export default class Manager extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column.date()
  declare dateOfBirth: DateTime

  @column()
  declare nationality: string

  @column()
  declare photoUrl: string | null

  @column()
  declare bio: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => TeamManagerHistory)
  declare teamManagerHistories: HasMany<typeof TeamManagerHistory>
}
