enum SeasonStatus {
  UPCOMING = 1,
  ACTIVE = 2,
  COMPLETED = 3,
}

export const seasonStatusValues = [
  {
    id: SeasonStatus.UPCOMING,
    name: 'UPCOMING',
  },
  {
    id: SeasonStatus.ACTIVE,
    name: 'ACTIVE',
  },
  {
    id: SeasonStatus.COMPLETED,
    name: 'COMPLETED',
  },
]

export default SeasonStatus
