enum GoalType {
  OPEN_PLAY = 1,
  PENALTY = 2,
  OWN_GOAL = 3,
  FREE_KICK = 4,
  HEADER = 5,
}

export const goalTypeValues = [
  {
    id: GoalType.OPEN_PLAY,
    name: 'OPEN_PLAY',
  },
  {
    id: GoalType.PENALTY,
    name: 'PENALTY',
  },
  {
    id: GoalType.OWN_GOAL,
    name: 'OWN_GOAL',
  },
  {
    id: GoalType.FREE_KICK,
    name: 'FREE_KICK',
  },
  {
    id: GoalType.HEADER,
    name: 'HEADER',
  },
]

export default GoalType
