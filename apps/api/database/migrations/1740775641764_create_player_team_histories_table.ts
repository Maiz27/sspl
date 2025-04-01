import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'player_team_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.uuid('player_id').references('id').inTable('players').notNullable()
      table.uuid('team_id').references('id').inTable('teams').notNullable()

      table.uuid('season_id').references('id').inTable('seasons').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()

      table.integer('jersey_number').unsigned().notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
