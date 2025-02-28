import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'node:crypto'
import Player from './player.js'
import CardEvent from './card_event.js'
import GoalEvent from './goal_event.js'
import OtherEvent from './other_event.js'
import SubstitutionEvent from './substitution_event.js'
import MatchNonEventStat from './match_non_event_stat.js'
import PlayerTeamHistory from './player_team_history.js'
import TeamManagerHistory from './team_manager_history.js'

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

  @hasMany(() => GoalEvent)
  declare goalEvents: HasMany<typeof GoalEvent>

  @hasMany(() => CardEvent)
  declare cardEvents: HasMany<typeof CardEvent>

  @hasMany(() => SubstitutionEvent)
  declare substitutionEvents: HasMany<typeof SubstitutionEvent>

  @hasMany(() => OtherEvent)
  declare otherEvents: HasMany<typeof OtherEvent>

  @hasMany(() => MatchNonEventStat)
  declare nonEventStats: HasMany<typeof MatchNonEventStat>

  @hasMany(() => PlayerTeamHistory)
  declare playerTeamHistories: HasMany<typeof PlayerTeamHistory>

  @hasMany(() => TeamManagerHistory)
  declare teamManagerHistories: HasMany<typeof TeamManagerHistory>
}
