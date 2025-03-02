import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TeamFactory } from '#database/factories/team_factory'
import { ManagerFactory } from '#database/factories/manager_factory'
import { teams } from '#database/data/teams'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await this.#createTeams()

    await ManagerFactory.createMany(teams.length)
  }

  async #createTeams() {
    let index = 0
    await TeamFactory.tap((row, { faker }) => {
      const team = teams[index]

      row.name = team.name
      row.shortName = team.shortName
      row.city = team.cityName
      row.primaryColor = team.primaryColor
      row.secondaryColor = team.secondaryColor

      // Set default values for other required fields that aren't in your teams array
      row.description = `${team.name} is a football club based in ${team.cityName}.`
      row.website = `https://www.${team.shortName.toLowerCase()}.com`
      row.socialMediaHandles = JSON.stringify({
        twitter: `@${team.shortName.toLowerCase()}`,
        instagram: `${team.shortName.toLowerCase()}fc`,
      })
      row.contactInfo = JSON.stringify({
        email: `info@${team.shortName.toLowerCase()}.com`,
        phone: faker.phone.number(),
      })
      index++
    }).createMany(teams.length)
  }
}
