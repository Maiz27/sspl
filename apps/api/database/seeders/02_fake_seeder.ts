import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { seasons } from '#database/data/seasons'
import type { UUID } from 'node:crypto'
import { MatchFactory } from '#database/factories/match_factory'
import MatchStatus from '#enums/match_status'
import { teams } from '#database/data/teams'

export default class extends BaseSeeder {
  async run() {
    await this.createFixtures()
  }

  async createFixtures() {
    const teamCount = teams.length

    // Select current season
    const season = seasons[1]
    const seasonStart = DateTime.fromJSDate(new Date(season.startDate))

    // Create a function to generate one round of fixtures
    const generateRound = async (roundIndex: number, isReversed: boolean = false) => {
      const matchWeek = isReversed ? teamCount + roundIndex : roundIndex + 1
      const matchDate = seasonStart.plus({
        days: roundIndex * 7 + (isReversed ? (teamCount - 1) * 7 : 0),
      })

      for (let i = 0; i < Math.floor(teamCount / 2); i++) {
        // Determine the two teams playing in this fixture
        // First team is fixed, second team rotates
        const firstTeamIndex = i
        const secondTeamIndex = teamCount - 1 - i

        // Skip invalid matches
        if (firstTeamIndex === secondTeamIndex) continue

        // Alternate home/away for better distribution and add isReversed to flip for second half
        const isHomeFirst = (roundIndex % 2 === 0) !== isReversed

        const homeTeamIndex = isHomeFirst ? firstTeamIndex : secondTeamIndex
        const awayTeamIndex = isHomeFirst ? secondTeamIndex : firstTeamIndex

        // Account for rotation (except team at index 0)
        const actualHomeIndex =
          homeTeamIndex === 0 ? 0 : (homeTeamIndex + roundIndex) % (teamCount - 1)
        const actualAwayIndex =
          awayTeamIndex === 0 ? 0 : (awayTeamIndex + roundIndex) % (teamCount - 1)

        const homeTeam = teams[actualHomeIndex]
        const awayTeam = teams[actualAwayIndex]

        // Skip if any team is missing (shouldn't happen with correct algorithm)
        if (!homeTeam || !awayTeam) continue

        // Add 0-3 days of randomness within the match week
        const dayOffset = Math.floor(Math.random() * 4)

        await MatchFactory.tap((row) => {
          row.seasonId = season.id as UUID
          row.homeTeamId = homeTeam.id as UUID
          row.awayTeamId = awayTeam.id as UUID
          row.matchDate = matchDate.plus({ days: dayOffset })
          row.matchWeek = matchWeek
          row.statusId = MatchStatus.SCHEDULED
        }).create()
      }
    }

    // First half of the season
    for (let round = 0; round < teamCount - 1; round++) {
      await generateRound(round)
    }

    // Second half of the season (reverse fixtures)
    for (let round = 0; round < teamCount - 1; round++) {
      await generateRound(round, true)
    }
  }
}
