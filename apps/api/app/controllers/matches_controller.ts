/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import MatchService from '#services/match_service'

@inject()
export default class MatchesController {
  constructor(private matchService: MatchService) {}

  /**
   * List matches with optional filters
   */
  public async index({ request, response }: HttpContext) {
    try {
      const { season_id, team_id, match_week, status_id } = request.qs()

      const matches = await this.matchService.getMatches({
        seasonId: season_id,
        teamId: team_id,
        matchWeek: Number.parseInt(match_week),
        status: Number.parseInt(status_id),
      })

      return response.ok(matches)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to retrieve matches',
        error: error.message,
      })
    }
  }

  /**
   * Get a single match by ID
   */
  public async show({ params, response }: HttpContext) {
    try {
      const match = await this.matchService.getMatchById(params.id)

      if (!match) {
        return response.notFound({ message: 'Match not found' })
      }

      return response.ok(match)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to retrieve match',
        error: error.message,
      })
    }
  }

  /**
   * Create multiple matches
   */
  public async store({ request, response }: HttpContext) {
    try {
      const matchesData = request.input('matches') // Expecting an array of matches

      if (!Array.isArray(matchesData) || matchesData.length === 0) {
        return response.badRequest({ message: 'Invalid matches data' })
      }

      const matches = await this.matchService.createMatches(matchesData)

      return response.created(matches)
    } catch (error) {
      return response.badRequest({
        message: 'Failed to create matches',
        error: error.message,
      })
    }
  }

  /**
   * Update an existing match
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const matchData = request.only(['matchDate', 'statusId', 'matchWeek'])

      const match = await this.matchService.updateMatch(params.id, matchData)

      if (!match) {
        return response.notFound({ message: 'Match not found' })
      }

      return response.ok(match)
    } catch (error) {
      return response.badRequest({
        message: 'Failed to update match',
        error: error.message,
      })
    }
  }

  /**
   * Delete a match
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      const deleted = await this.matchService.deleteMatch(params.id)

      if (!deleted) {
        return response.notFound({ message: 'Match not found' })
      }

      return response.noContent()
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to delete match',
        error: error.message,
      })
    }
  }

  /**
   * Get match score
   */
  public async getScore(_: HttpContext) {
    // TODO: Implement
  }

  /**
   * Get match timeline
   */
  public async getTimeline(_: HttpContext) {
    // TODO: Implement
  }
}
