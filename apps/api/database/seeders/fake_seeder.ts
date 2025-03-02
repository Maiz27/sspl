import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import type { FactoryContextContract } from '@adonisjs/lucid/types/factory'
import { TeamFactory } from '#database/factories/team_factory'
import { ManagerFactory } from '#database/factories/manager_factory'
import { SeasonFactory } from '#database/factories/season_factory'
import { teams } from '#database/data/teams'
import { seasons } from '#database/data/seasons'
import Team from '#models/team'

export default class extends BaseSeeder {
  async run() {
    // create all the teams that won't be champions
    await this.#createRegularTeams()

    // Create each season with its proper state and relationship to a champion if needed
    await this.#createSeasons()

    // Create managers for each team
    await ManagerFactory.createMany(teams.length)
  }

  async #createRegularTeams() {
    // Skip the first team (index 0) as it will be created as a champion
    const teamsToCreate = teams.slice(1)

    let index = 1
    await TeamFactory.tap((row, ctx) => {
      const team = teams[index]
      this.#applyCustomTeamFields(row, ctx, team)
      index++
    }).createMany(teamsToCreate.length)
  }

  async #createSeasons() {
    // Create completed season with champion (we'll use teams[0] as champion)
    await SeasonFactory.with('champion', 1, (champion) =>
      champion.tap((row, ctx) => {
        const championTeam = teams[0]
        this.#applyCustomTeamFields(row, ctx, championTeam)
      })
    )
      .apply('completed')
      .tap((season) => {
        const seasonData = seasons[0]
        season.startDate = DateTime.fromJSDate(new Date(seasonData.startDate))
        season.endDate = DateTime.fromJSDate(new Date(seasonData.endDate))
        season.statusId = seasonData.statusId
      })
      .create()

    // Create the rest of the seasons
    let index = 1
    await SeasonFactory.tap((season) => {
      const seasonData = seasons[index]
      season.startDate = DateTime.fromJSDate(new Date(seasonData.startDate))
      season.endDate = DateTime.fromJSDate(new Date(seasonData.endDate))
      season.statusId = seasonData.statusId
      index++
    }).createMany(seasons.length - 1)
  }

  #applyCustomTeamFields(row: Team, ctx: FactoryContextContract, team: (typeof teams)[number]) {
    row.name = team.name
    row.shortName = team.shortName
    row.city = team.cityName
    row.primaryColor = team.primaryColor
    row.secondaryColor = team.secondaryColor

    // Set default values for other required fields
    row.description = `${team.name} is a football club based in ${team.cityName}.`
    row.website = `https://www.${team.shortName.toLowerCase()}.com`
    row.socialMediaHandles = JSON.stringify({
      twitter: `@${team.shortName.toLowerCase()}`,
      instagram: `${team.shortName.toLowerCase()}fc`,
    })
    row.contactInfo = JSON.stringify({
      email: `info@${team.shortName.toLowerCase()}.com`,
      phone: ctx.faker.phone.number(),
    })
  }
}
