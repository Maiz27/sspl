import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserRole from '#models/user_role'
import AccountStatus from '#models/account_status'
import EventType from '#models/event_type'
import MatchStatus from '#models/match_status'
import RefereeRole from '#models/referee_role'
import PlayerStatus from '#models/player_status'
import GoalType from '#models/goal_type'
import CardType from '#models/card_type'

import { userRoleValues } from '#enums/user_role'
import { accountStatusValues } from '#enums/account_status'
import { eventTypeValues } from '#enums/event_type'
import { matchStatusValues } from '#enums/match_status'
import { cardTypeValues } from '#enums/card_type'
import { goalTypeValues } from '#enums/goal_type'
import { playerStatusValues } from '#enums/player_status'
import { refereeRoleValues } from '#enums/referee_role'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await UserRole.createMany(userRoleValues)

    await AccountStatus.createMany(accountStatusValues)

    await EventType.createMany(eventTypeValues)

    await MatchStatus.createMany(matchStatusValues)

    await RefereeRole.createMany(refereeRoleValues)

    await PlayerStatus.createMany(playerStatusValues)

    await GoalType.createMany(goalTypeValues)

    await CardType.createMany(cardTypeValues)
  }
}
