import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import type { FactoryContextContract } from '@adonisjs/lucid/types/factory'
import { TeamFactory } from '#database/factories/team_factory'
import { ManagerFactory } from '#database/factories/manager_factory'
import { SeasonFactory } from '#database/factories/season_factory'
import { teams } from '#database/data/teams'
import { seasons } from '#database/data/seasons'
import Team from '#models/team'
import { players } from '#database/data/players'
import type { UUID } from 'node:crypto'
import { PlayerFactory } from '#database/factories/player_factory'

export default class extends BaseSeeder {
  async run() {
    // create all the teams that won't be champions
    await this.#createTeams()

    // Create each season with its proper state and relationship to a champion if needed
    await this.#createSeasons()

    // Create managers for each team
    await ManagerFactory.createMany(teams.length)

    // Create players for each team
    await this.#createPlayers()
  }

  async #createTeams() {
    let i = 0
    await TeamFactory.tap((row, ctx) => {
      const team = teams[i]
      this.#applyCustomTeamFields(row, ctx, team)
      i++
    }).createMany(teams.length)
  }

  async #createSeasons() {
    let i = 0
    await SeasonFactory.tap((season) => {
      const seasonData = seasons[i]
      season.id = seasonData.id as UUID
      season.startDate = DateTime.fromJSDate(new Date(seasonData.startDate))
      season.endDate = DateTime.fromJSDate(new Date(seasonData.endDate))
      season.statusId = seasonData.statusId
      season.championId = seasonData.championId as UUID
      i++
    }).createMany(seasons.length)
  }

  async #createPlayers() {
    // Create 25 players for each team
    for (const team of teams) {
      let playerOffset = 0

      await PlayerFactory.tap((row) => {
        const player = players[playerOffset % players.length]
        row.statusId = player.status
        row.positionId = player.position
        playerOffset++
      })
        .with('playerTeamHistories', 1, (historyCtx) => {
          historyCtx.tap((row) => {
            const teamId = team.id as UUID
            const player = players[(playerOffset - 1) % players.length] // Use the same player index
            row.jerseyNumber = player.jersey
            row.teamId = teamId
            row.seasonId = seasons[1].id as UUID
          })
        })
        .createMany(25) // Create 25 players per team
    }
  }

  #applyCustomTeamFields(row: Team, ctx: FactoryContextContract, team: (typeof teams)[number]) {
    row.id = team.id as UUID
    row.name = team.name
    row.shortName = team.shortName
    row.city = team.cityName
    row.primaryColor = team.primaryColor
    row.secondaryColor = team.secondaryColor
    row.description = team.description
    row.website = team.website

    row.socialMediaHandles = JSON.stringify({
      twitter: `@${team.shortName.toLowerCase()}`,
      instagram: `${team.shortName.toLowerCase()}fc`,
    })

    row.contactInfo = JSON.stringify({
      email: `info@${team.shortName.toLowerCase()}.com`,
      phone: ctx.faker.phone.number({ style: 'international' }),
    })
  }
}
