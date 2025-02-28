import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Player from './player.js'
import type { UUID } from 'node:crypto'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare name: string

  @column()
  declare shortName: string

  @column.date()
  declare foundedDate: DateTime

  @column()
  declare description: string

  @column()
  declare logoUrl: string | null

  @column()
  declare website: string | null

  @column()
  declare primaryColor: string

  @column()
  declare secondaryColor: string | null

  @column()
  declare socialMediaHandles: string | null

  @column()
  declare contactInfo: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Player)
  declare players: HasMany<typeof Player>
}
