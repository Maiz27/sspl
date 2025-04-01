import Match from '#models/match'
import BaseService from '#services/base_service'
import type { UUID } from 'node:crypto'

type MatchFilterOptions = {
  seasonId: UUID
  teamId?: UUID
  matchWeek?: number
  status?: number
}

export default class MatchService extends BaseService {
  constructor() {
    super('MatchService')
  }

  /**
   * Fetch matches with optional filters
   */
  public async getMatches({ seasonId, teamId, matchWeek, status }: MatchFilterOptions) {
    return this.safeExecute(async () => {
      return await Match.query()
        .where('season_id', seasonId)
        .if(matchWeek, (q) => q.andWhere('match_week', matchWeek!))
        .if(status, (q) => q.andWhere('status_id', status!))
        .if(teamId, (q) =>
          q.andWhere((subQ) => {
            subQ.where('home_team_id', teamId!).orWhere('away_team_id', teamId!)
          })
        )
        .preload('homeTeam')
        .preload('awayTeam')
    }, 'Failed to fetch matches')
  }

  /**
   * Fetch match by ID
   */
  public async getMatchById(id: UUID) {
    return this.safeExecute(async () => {
      return await Match.query().where('id', id).preload('homeTeam').preload('awayTeam')
    }, 'Failed to fetch match')
  }

  /**
   * Create multiple matches in a single transaction
   */
  public async createMatches(
    matchesData: Array<
      Pick<Match, 'seasonId' | 'homeTeamId' | 'awayTeamId' | 'matchDate' | 'statusId' | 'matchWeek'>
    >
  ) {
    return this.withTransaction(async (trx) => {
      const createdMatches = await Match.createMany(matchesData, { client: trx })
      return createdMatches
    })
  }

  /**
   * Update an existing match
   */
  public async updateMatch(
    id: UUID,
    matchData: Pick<Match, 'matchDate' | 'statusId' | 'matchWeek'>
  ) {
    return this.safeExecute(async () => {
      return await Match.query().where('id', id).update(matchData)
    })
  }

  /**
   * Delete a match
   */
  public async deleteMatch(id: UUID) {
    return this.safeExecute(async () => {
      return await Match.query().where('id', id).delete()
    })
  }
}
