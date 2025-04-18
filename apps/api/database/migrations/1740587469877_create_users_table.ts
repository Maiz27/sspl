import UserRole from '#enums/user_role'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('username', 50).notNullable().unique()
      table.string('email', 254).notNullable().unique()

      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).nullable()

      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('user_roles')
        .notNullable()
        .defaultTo(UserRole.USER)
      table
        .integer('account_status_id')
        .unsigned()
        .references('id')
        .inTable('account_statuses')
        .notNullable()

      table.string('avatar_url').nullable()

      table.string('password').notNullable()
      table.timestamp('last_password_change').nullable()

      table.timestamp('last_login').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
