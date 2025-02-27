enum MatchStatus {
  SCHEDULED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  POSTPONED = 4,
  CANCELED = 5,
}

export const matchStatusValues = [
  {
    id: MatchStatus.SCHEDULED,
    name: 'SCHEDULED',
  },
  {
    id: MatchStatus.IN_PROGRESS,
    name: 'IN_PROGRESS',
  },
  {
    id: MatchStatus.COMPLETED,
    name: 'COMPLETED',
  },
  {
    id: MatchStatus.POSTPONED,
    name: 'POSTPONED',
  },
  {
    id: MatchStatus.CANCELED,
    name: 'CANCELED',
  },
]

export default MatchStatus
