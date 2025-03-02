import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'substitution_events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.uuid('match_id').references('id').inTable('matches').onDelete('CASCADE').notNullable()
      table.uuid('team_id').references('id').inTable('teams').notNullable()

      table.integer('minute').notNullable()
      table.uuid('player_in_id').references('id').inTable('players').notNullable()
      table.uuid('player_out_id').references('id').inTable('players').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
