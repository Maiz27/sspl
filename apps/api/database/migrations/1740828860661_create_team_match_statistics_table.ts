import CardType from '#enums/card_type'
import EventType, { eventTypeValues } from '#enums/event_type'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'team_match_statistics'

  async up() {
    this.schema.createMaterializedView(this.tableName, (view) => {
      view.columns([
        'match_id',
        'team_id',
        'possession_percentage',
        'passes_total',
        'passes_completed',
        'shots_total',
        'shots_on_target',
        'corners',
        'fouls',
        'offsides',
        'yellow_cards',
        'red_cards',
        'goals_scored',
        'goals_against',
      ])

      view.as(
        this.knex()
          .select(
            // Basic match and team identifiers
            'm.id as match_id',
            't.id as team_id',

            // Possession percentage
            this.knex()
              .select('possession_percentage')
              .from('match_non_event_stats as mne')
              .whereRaw('mne.match_id = m.id AND mne.team_id = t.id')
              .as('possession_percentage'),

            // Passes
            this.knex()
              .select('passes_total')
              .from('match_non_event_stats as mne')
              .whereRaw('mne.match_id = m.id AND mne.team_id = t.id')
              .as('passes_total'),

            this.knex()
              .count('* as passes_completed')
              .from('match_non_event_stats as mne')
              .whereRaw('mne.match_id = m.id AND mne.team_id = t.id')
              .as('passes_completed'),

            // Shots (Total & On Target)
            this.knex()
              .count('* as shots_total')
              .from('other_events as oe')
              .whereRaw(
                `oe.match_id = m.id AND oe.team_id = t.id AND oe.event_type_id IN (
                  SELECT id FROM event_types WHERE name IN (?, ?)
                )`,
                [
                  eventTypeValues[EventType.SHOT_ON_TARGET].name,
                  eventTypeValues[EventType.SHOT_OFF_TARGET].name,
                ]
              )
              .as('shots_total'),

            this.knex()
              .count('* as shots_on_target')
              .from('other_events as oe')
              .whereRaw(
                `oe.match_id = m.id AND oe.team_id = t.id AND oe.event_type_id = (
                  SELECT id FROM event_types WHERE name = ?
                )`,
                [eventTypeValues[EventType.SHOT_ON_TARGET].name]
              )
              .as('shots_on_target'),

            // Set Pieces (Corners & Free Kicks)
            this.knex()
              .count('* as corners')
              .from('other_events as oe')
              .whereRaw(
                `oe.match_id = m.id AND oe.team_id = t.id AND oe.event_type_id = (
                  SELECT id FROM event_types WHERE name = ?
                )`,
                [eventTypeValues[EventType.CORNER].name]
              )
              .as('corners'),

            // Fouls and Offsides
            this.knex()
              .count('* as fouls')
              .from('other_events as oe')
              .whereRaw(
                `oe.match_id = m.id AND oe.team_id = t.id AND oe.event_type_id = (
                  SELECT id FROM event_types WHERE name = ?
                )`,
                [eventTypeValues[EventType.FOUL].name]
              )
              .as('fouls'),

            this.knex()
              .count('* as offsides')
              .from('other_events as oe')
              .whereRaw(
                `oe.match_id = m.id AND oe.team_id = t.id AND oe.event_type_id = (
                  SELECT id FROM event_types WHERE name = ?
                )`,
                [eventTypeValues[EventType.OFFSIDE].name]
              )
              .as('offsides'),

            // Cards (Yellow & Red)
            this.knex()
              .count('* as yellow_cards')
              .from('card_events as ce')
              .whereRaw('ce.match_id = m.id AND ce.team_id = t.id AND ce.card_type_id = ?', [
                CardType.YELLOW,
              ])
              .as('yellow_cards'),

            this.knex()
              .count('* as red_cards')
              .from('card_events as ce')
              .whereRaw('ce.match_id = m.id AND ce.team_id = t.id AND ce.card_type_id = ?', [
                CardType.RED,
              ])
              .as('red_cards'),

            // Goals (Scored & Against)
            this.knex()
              .count('* as goals_scored')
              .from('goal_events as ge')
              .whereRaw('ge.match_id = m.id AND ge.team_id = t.id')
              .as('goals_scored'),

            this.knex()
              .count('* as goals_against')
              .from('goal_events as ge')
              .whereRaw('ge.match_id = m.id AND ge.team_id != t.id')
              .as('goals_against')
          )
          // Joining teams table to get home & away teams dynamically
          .from('matches as m')
          .join('teams as t', function () {
            this.on('t.id', '=', 'm.home_team_id').orOn('t.id', '=', 'm.away_team_id')
          })
      )
    })
  }

  async down() {
    this.schema.dropMaterializedView(this.tableName)
  }
}
