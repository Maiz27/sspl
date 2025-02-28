import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'goal_events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')

      table.uuid('match_id').references('id').inTable('matches').onDelete('CASCADE').notNullable()
      table.uuid('team_id').references('id').inTable('teams').notNullable()

      table.integer('minute').notNullable()
      table.integer('goal_type_id').references('id').inTable('goal_types').notNullable()

      table.uuid('scorer_id').references('id').inTable('players').notNullable()
      table.uuid('assistant_id').references('id').inTable('players').nullable()

      table.text('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
