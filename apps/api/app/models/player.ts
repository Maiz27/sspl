import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

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
  declare positionId: number

  @column()
  declare jerseyNumber: number | null

  @column()
  declare teamId: string

  @column()
  declare statusId: number

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
}
