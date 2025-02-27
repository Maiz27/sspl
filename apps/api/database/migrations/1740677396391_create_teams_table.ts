import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')

      table.string('name').notNullable().unique()
      table.string('short_name', 50).notNullable()
      table.date('founded_date').notNullable()
      table.text('description').notNullable()

      table.string('logo_url').nullable()
      table.string('website').nullable()

      table.string('primary_color').notNullable()
      table.string('secondary_color').nullable()

      table.json('social_media_handles').nullable()
      table.json('contact_info').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
