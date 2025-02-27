import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'managers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()

      table.date('date_of_birth')
      table.string('nationality')

      table.string('photo_url').nullable()
      table.text('bio').defaultTo('')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
