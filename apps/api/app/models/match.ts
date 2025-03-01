import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { UUID } from 'node:crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Season from './season.js'
import Team from './team.js'
import SeasonStatus from './season_status.js'
import MatchReferee from './match_referee.js'
import MatchPlayer from './match_player.js'
import OtherEvent from './other_event.js'
import SubstitutionEvent from './substitution_event.js'
import CardEvent from './card_event.js'
import GoalEvent from './goal_event.js'
import MatchNonEventStat from './match_non_event_stat.js'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare seasonId: UUID

  @column()
  declare homeTeamId: UUID

  @column()
  declare awayTeamId: UUID

  @column.dateTime()
  declare matchDate: DateTime

  @column()
  declare statusId: number

  @column()
  declare matchWeek: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @belongsTo(() => Team)
  declare homeTeam: BelongsTo<typeof Team>

  @belongsTo(() => Team)
  declare awayTeam: BelongsTo<typeof Team>

  @belongsTo(() => SeasonStatus)
  declare status: BelongsTo<typeof SeasonStatus>

  @hasMany(() => MatchReferee)
  declare matchReferees: HasMany<typeof MatchReferee>

  @hasMany(() => MatchPlayer)
  declare matchPlayers: HasMany<typeof MatchPlayer>

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
}
