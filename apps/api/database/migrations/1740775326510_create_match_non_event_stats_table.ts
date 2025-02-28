import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'match_non_event_stats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('match_id').references('id').inTable('matches').onDelete('CASCADE').notNullable()
      table.uuid('team_id').references('id').inTable('teams').notNullable()

      table.decimal('possession_percentage').notNullable()
      table.integer('passes_total').notNullable()
      table.integer('passes_completed').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
