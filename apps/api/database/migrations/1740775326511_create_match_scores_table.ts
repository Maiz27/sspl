import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'match_scores'

  async up() {
    this.schema.createView(this.tableName, (view) => {
      view.columns(['match_id', 'home_team_id', 'away_team_id', 'home_score', 'away_score'])

      view.as(
        this.knex()
          .select('m.id', 'm.home_team_id', 'm.away_team_id')
          .select(
            this.knex()
              .count('*')
              .as('home_score')
              .from('goal_events as ge')
              .whereRaw('ge.match_id = m.id AND ge.team_id = m.home_team_id')
          )
          .select(
            this.knex()
              .count('*')
              .as('away_score')
              .from('goal_events as ge')
              .whereRaw('ge.match_id = m.id AND ge.team_id = m.away_team_id')
          )
          .from('matches as m')
      )
    })
  }

  async down() {
    this.schema.dropView(this.tableName)
  }
}
