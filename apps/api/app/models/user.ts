import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AccountStatus from './account_status.js'
import UserRole from './user_role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string | null

  @column()
  declare roleId: string

  @column()
  declare accountStatusId: string

  @column()
  declare avatarUrl: string | null

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime()
  declare lastPasswordChange: DateTime | null

  @column.dateTime()
  declare lastLogin: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @belongsTo(() => UserRole)
  declare role: BelongsTo<typeof UserRole>

  @belongsTo(() => AccountStatus)
  declare accountStatus: BelongsTo<typeof AccountStatus>

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }
}
