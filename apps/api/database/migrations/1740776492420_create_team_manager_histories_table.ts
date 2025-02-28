import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'team_manager_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('team_id').references('id').inTable('teams').notNullable()
      table.uuid('manager_id').references('id').inTable('managers').notNullable()

      table.date('start_date').notNullable()
      table.date('end_date').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
