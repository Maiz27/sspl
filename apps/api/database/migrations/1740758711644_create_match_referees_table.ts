import RefereeRole from '#enums/referee_role'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'match_referees'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('match_id').references('id').inTable('matches').onDelete('CASCADE').notNullable()
      table.uuid('referee_id').references('id').inTable('referees').notNullable()
      table
        .integer('role_id')
        .references('id')
        .inTable('referee_roles')
        .notNullable()
        .defaultTo(RefereeRole.MAIN_REFEREE)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
