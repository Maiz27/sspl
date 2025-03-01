import CardType from '#enums/card_type'
import EventType, { eventTypeValues } from '#enums/event_type'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'match_player_statistics'

  async up() {
    // Create a view
    this.schema.createView(this.tableName, (view) => {
      // Define columns that will be in the view
      view.columns([
        'player_id',
        'match_id',
        'team_id',
        'minutes_played',
        'goals',
        'assists',
        'yellow_cards',
        'red_cards',
        'shots',
        'shots_on_target',
        'fouls_committed',
        'fouls_suffered',
      ])

      view.as(
        this.knex()
          .select('mp.player_id', 'mp.match_id', 'mp.team_id', 'mp.minutes_played')
          .select(
            this.knex()
              .count('*')
              .as('goals')
              .from('goal_events as ge')
              .whereRaw('ge.scorer_id = mp.player_id AND ge.match_id = mp.match_id')
          )
          .select(
            this.knex()
              .count('*')
              .as('assists')
              .from('goal_events as ge')
              .whereRaw('ge.assistant_id = mp.player_id AND ge.match_id = mp.match_id')
          )
          .select(
            this.knex()
              .count('*')
              .as('yellow_cards')
              .from('card_events as ce')
              .whereRaw(
                `ce.player_id = mp.player_id AND ce.match_id = mp.match_id AND ce.card_type_id = ${CardType.YELLOW}`
              )
          )
          .select(
            this.knex()
              .count('*')
              .as('red_cards')
              .from('card_events as ce')
              .whereRaw(
                `ce.player_id = mp.player_id AND ce.match_id = mp.match_id AND ce.card_type_id = ${CardType.RED}`
              )
          )
          .select(
            this.knex().count('*').as('shots').from('other_events as oe').whereRaw(`
                oe.primary_player_id = mp.player_id 
                AND oe.match_id = mp.match_id 
                AND oe.event_type_id IN (SELECT id FROM event_types
                WHERE name IN ('${eventTypeValues[EventType.SHOT_ON_TARGET].name}', '${eventTypeValues[EventType.SHOT_OFF_TARGET].name}'))
              `)
          )
          .select(
            this.knex().count('*').as('shots_on_target').from('other_events as oe').whereRaw(`
                oe.primary_player_id = mp.player_id 
                AND oe.match_id = mp.match_id 
                AND oe.event_type_id = (SELECT id FROM event_types WHERE name = '${eventTypeValues[EventType.SHOT_ON_TARGET].name}')
              `)
          )
          .select(
            this.knex().count('*').as('fouls_committed').from('other_events as oe').whereRaw(`
                oe.primary_player_id = mp.player_id 
                AND oe.match_id = mp.match_id 
                AND oe.event_type_id = (SELECT id FROM event_types WHERE name = '${eventTypeValues[EventType.FOUL].name}')
              `)
          )
          .select(
            this.knex().count('*').as('fouls_suffered').from('other_events as oe').whereRaw(`
                oe.secondary_player_id = mp.player_id 
                AND oe.match_id = mp.match_id 
                AND oe.event_type_id = (SELECT id FROM event_types WHERE name = '${eventTypeValues[EventType.FOUL].name}')
              `)
          )
          .from('match_players as mp')
      )
    })
  }

  async down() {
    this.schema.dropView(this.tableName)
  }
}
