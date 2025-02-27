enum PlayerStatus {
  ACTIVE = 1,
  INJURED = 2,
  SUSPENDED = 3,
  RETIRED = 4,
}

export const playerStatusValues = [
  {
    id: PlayerStatus.ACTIVE,
    name: 'ACTIVE',
  },
  {
    id: PlayerStatus.INJURED,
    name: 'INJURED',
  },
  {
    id: PlayerStatus.SUSPENDED,
    name: 'SUSPENDED',
  },
  {
    id: PlayerStatus.RETIRED,
    name: 'RETIRED',
  },
]

export default PlayerStatus
