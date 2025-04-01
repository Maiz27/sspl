import MatchStatus from '#enums/match_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.uuid('season_id').references('id').inTable('seasons').onDelete('CASCADE').notNullable()
      table.uuid('home_team_id').references('id').inTable('teams').notNullable()
      table.uuid('away_team_id').references('id').inTable('teams').notNullable()

      table.timestamp('match_date').notNullable()
      table
        .integer('status_id')
        .references('id')
        .inTable('match_statuses')
        .notNullable()
        .defaultTo(MatchStatus.SCHEDULED)

      table.integer('match_week').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // Prevent duplicate matches in the same season and match week
      table.unique(['season_id', 'home_team_id', 'away_team_id', 'match_week'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
