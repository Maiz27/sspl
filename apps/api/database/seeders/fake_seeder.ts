import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import type { FactoryContextContract } from '@adonisjs/lucid/types/factory'
import { TeamFactory } from '#database/factories/team_factory'
import { ManagerFactory } from '#database/factories/manager_factory'
import { SeasonFactory } from '#database/factories/season_factory'
import { teams } from '#database/data/teams'
import { seasons } from '#database/data/seasons'
import Team from '#models/team'
import type { UUID } from 'node:crypto'
import { players } from '#database/data/players'
import { PlayerFactory } from '#database/factories/player_factory'
import { managers } from '#database/data/managers'

export default class extends BaseSeeder {
  async run() {
    // create all the teams
    await this.#createTeams()

    // Create each seasons
    await this.#createSeasons()

    // Create managers for each team
    await this.#createManagers()

    // Create players for each team
    await this.#createPlayers()
  }

  async #createTeams() {
    for (const team of teams) {
      await TeamFactory.tap((row, ctx) => {
        this.#applyCustomTeamFields(row, ctx, team)
      }).create()
    }
  }

  async #createSeasons() {
    for (const season of seasons) {
      await SeasonFactory.tap((row) => {
        row.id = season.id as UUID
        row.startDate = DateTime.fromJSDate(new Date(season.startDate))
        row.endDate = DateTime.fromJSDate(new Date(season.endDate))
        row.statusId = season.statusId
        row.championId = season.championId as UUID
      }).create()
    }
  }

  async #createManagers() {
    let teamOffset = 0
    for (const manager of managers) {
      await ManagerFactory.tap((row) => {
        row.id = manager.id as UUID
      })
        .with('teamManagerHistories', 1, (historyCtx) => {
          historyCtx.tap((row) => {
            const teamId = teams[teamOffset].id as UUID
            row.teamId = teamId
            row.startDate = DateTime.fromJSDate(new Date(manager.startDate))
            row.endDate = DateTime.fromJSDate(new Date(manager.endDate))
            teamOffset++
          })
        })
        .create()
    }
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
