import SeasonStatus from '#enums/season_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'seasons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('slug').unique().notNullable()

      table.date('start_date')
      table.date('end_date')

      table
        .integer('status_id')
        .references('id')
        .inTable('season_statuses')
        .notNullable()
        .defaultTo(SeasonStatus.UPCOMING)

      table.uuid('championship_id').references('id').inTable('teams').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
