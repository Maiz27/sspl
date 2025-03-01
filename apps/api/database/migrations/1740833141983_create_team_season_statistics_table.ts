import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'team_season_statistics'

  async up() {
    this.schema.createMaterializedView(this.tableName, (view) => {
      view.columns([
        'team_id',
        'season_id',
        'matches_played',
        'wins',
        'draws',
        'losses',
        'goals_scored',
        'goals_against',
      ])

      view.as(
        this.knex()
          .select([
            'tms.team_id',
            'tms.season_id',

            // Matches Played (Distinct Match Count)
            this.knex()
              .countDistinct('tms.match_id')
              .from('team_match_statistics as tms')
              .whereRaw('tms.season_id = tms.season_id')
              .andWhereRaw('tms.team_id = tms.team_id')
              .as('matches_played'),

            // Wins (Count)
            this.knex()
              .count('*')
              .from('team_match_statistics as tms')
              .whereRaw('tms.season_id = tms.season_id')
              .andWhereRaw('tms.team_id = tms.team_id')
              .andWhereRaw('tms.goals_scored > tms.goals_against')
              .as('wins'),

            // Draws (Count)
            this.knex()
              .count('*')
              .from('team_match_statistics as tms')
              .whereRaw('tms.season_id = tms.season_id')
              .andWhereRaw('tms.team_id = tms.team_id')
              .andWhereRaw('tms.goals_scored = tms.goals_against')
              .as('draws'),

            // Losses (Count)
            this.knex()
              .count('*')
              .from('team_match_statistics as tms')
              .whereRaw('tms.season_id = tms.season_id')
              .andWhereRaw('tms.team_id = tms.team_id')
              .andWhereRaw('tms.goals_scored < tms.goals_against')
              .as('losses'),

            // Goals Scored (SUM)
            this.knex()
              .sum('tms.goals_scored')
              .from('team_match_statistics as tms')
              .whereRaw('tms.season_id = tms.season_id')
              .andWhereRaw('tms.team_id = tms.team_id')
              .as('goals_scored'),

            // Goals Against (SUM)
            this.knex()
              .sum('tms.goals_against')
              .from('team_match_statistics as tms')
              .whereRaw('tms.season_id = tms.season_id')
              .andWhereRaw('tms.team_id = tms.team_id')
              .as('goals_against'),
          ])
          .from('team_match_statistics as tms')
          .groupBy(['tms.team_id', 'tms.season_id'])
      )
    })
  }

  async down() {
    this.schema.dropMaterializedView(this.tableName)
  }
}
