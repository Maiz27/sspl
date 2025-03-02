import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import MatchGallery from './match_gallery.js'

export default class GalleryImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare matchGalleryId: UUID

  @column()
  declare url: string

  @column()
  declare caption: string | null

  @column()
  declare order: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => MatchGallery)
  declare matchGallery: BelongsTo<typeof MatchGallery>
}
