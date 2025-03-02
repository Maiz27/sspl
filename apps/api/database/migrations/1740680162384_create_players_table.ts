import PlayerStatus from '#enums/player_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('nickname').nullable()

      table.date('date_of_birth').notNullable()
      table.string('nationality').notNullable()

      table.integer('height_cm').nullable()
      table.integer('weight_kg').nullable()

      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('player_statuses')
        .notNullable()
        .defaultTo(PlayerStatus.ACTIVE)
      table.uuid('team_id').references('id').inTable('teams').onDelete('CASCADE')
      table
        .integer('position_id')
        .unsigned()
        .references('id')
        .inTable('player_positions')
        .notNullable()
      table.integer('jersey_number').nullable()

      table.string('photo_url').nullable()
      table.text('biography').nullable()

      table.date('contract_start_date').nullable()
      table.date('contract_end_date').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
