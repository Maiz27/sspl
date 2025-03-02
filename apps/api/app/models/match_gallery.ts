import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Match from './match.js'
import GalleryImage from './gallery_image.js'

export default class MatchGallery extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare matchId: UUID

  @column()
  declare title: string | null

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Match)
  declare match: BelongsTo<typeof Match>

  @hasMany(() => GalleryImage)
  declare galleryImages: HasMany<typeof GalleryImage>
}
