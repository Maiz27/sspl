import CardType from '#enums/card_type'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'card_events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.uuid('match_id').references('id').inTable('matches').onDelete('CASCADE').notNullable()
      table.uuid('team_id').references('id').inTable('teams').notNullable()

      table.integer('minute').notNullable()
      table
        .integer('card_type_id')
        .references('id')
        .inTable('card_types')
        .notNullable()
        .defaultTo(CardType.RED)

      table.uuid('player_id').references('id').inTable('players').notNullable()
      table.text('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
