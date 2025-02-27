enum EventType {
  KICKOFF = 1,
  HALFTIME = 2,
  FULLTIME = 3,
  EXTRA_TIME_START = 4,
  EXTRA_TIME_HALFTIME = 5,
  EXTRA_TIME_END = 6,
  PENALTY_SHOOTOUT_START = 7,
  PENALTY_AWARDED = 8,
  PENALTY_MISSED = 9,
  VAR_REVIEW = 10,
  MATCH_DELAYED = 11,
  MATCH_RESUMED = 12,
  COOLING_BREAK = 13,
  CORNER = 14,
  OFFSIDE = 15,
  FOUL = 16,
  FREE_KICK = 17,
  INJURY = 18,
  INJURY_RETURN = 19,
  WATER_BREAK = 20,
  PITCH_INVASION = 21,
  CROWD_INCIDENT = 22,
  COACH_DISCIPLINE = 23,
  TIMEOUT = 24,
  VIDEO_GOAL_REVIEW = 25,
  SHOT_ON_TARGET = 26,
  SHOT_OFF_TARGET = 27,
  SAVE = 28,
  CLEARANCE = 29,
  CROSSBAR_HIT = 30,
  POST_HIT = 31,
}

export const eventTypeValues = [
  {
    id: EventType.KICKOFF,
    name: 'KICKOFF',
  },
  {
    id: EventType.HALFTIME,
    name: 'HALFTIME',
  },
  {
    id: EventType.FULLTIME,
    name: 'FULLTIME',
  },
  {
    id: EventType.EXTRA_TIME_START,
    name: 'EXTRA_TIME_START',
  },
  {
    id: EventType.EXTRA_TIME_HALFTIME,
    name: 'EXTRA_TIME_HALFTIME',
  },
  {
    id: EventType.EXTRA_TIME_END,
    name: 'EXTRA_TIME_END',
  },
  {
    id: EventType.PENALTY_SHOOTOUT_START,
    name: 'PENALTY_SHOOTOUT_START',
  },
  {
    id: EventType.PENALTY_AWARDED,
    name: 'PENALTY_AWARDED',
  },
  {
    id: EventType.PENALTY_MISSED,
    name: 'PENALTY_MISSED',
  },
  {
    id: EventType.VAR_REVIEW,
    name: 'VAR_REVIEW',
  },
  {
    id: EventType.MATCH_DELAYED,
    name: 'MATCH_DELAYED',
  },
  {
    id: EventType.MATCH_RESUMED,
    name: 'MATCH_RESUMED',
  },
  {
    id: EventType.COOLING_BREAK,
    name: 'COOLING_BREAK',
  },
  {
    id: EventType.CORNER,
    name: 'CORNER',
  },
  {
    id: EventType.OFFSIDE,
    name: 'OFFSIDE',
  },
  {
    id: EventType.FOUL,
    name: 'FOUL',
  },
  {
    id: EventType.FREE_KICK,
    name: 'FREE_KICK',
  },
  {
    id: EventType.INJURY,
    name: 'INJURY',
  },
  {
    id: EventType.INJURY_RETURN,
    name: 'INJURY_RETURN',
  },
  {
    id: EventType.WATER_BREAK,
    name: 'WATER_BREAK',
  },
  {
    id: EventType.PITCH_INVASION,
    name: 'PITCH_INVASION',
  },
  {
    id: EventType.CROWD_INCIDENT,
    name: 'CROWD_INCIDENT',
  },
  {
    id: EventType.COACH_DISCIPLINE,
    name: 'COACH_DISCIPLINE',
  },
  {
    id: EventType.TIMEOUT,
    name: 'TIMEOUT',
  },
  {
    id: EventType.VIDEO_GOAL_REVIEW,
    name: 'VIDEO_GOAL_REVIEW',
  },
  {
    id: EventType.SHOT_ON_TARGET,
    name: 'SHOT_ON_TARGET',
  },
  {
    id: EventType.SHOT_OFF_TARGET,
    name: 'SHOT_OFF_TARGET',
  },
  {
    id: EventType.SAVE,
    name: 'SAVE',
  },
  {
    id: EventType.CLEARANCE,
    name: 'CLEARANCE',
  },
  {
    id: EventType.CROSSBAR_HIT,
    name: 'CROSSBAR_HIT',
  },
  {
    id: EventType.POST_HIT,
    name: 'POST_HIT',
  },
]

export default EventType
