enum RefereeRole {
  MAIN_REFEREE = 1,
  ASSISTANT_REFEREE = 2,
  VAR = 3,
  FOURTH_OFFICIAL = 4,
}

export const refereeRoleValues = [
  {
    id: RefereeRole.MAIN_REFEREE,
    name: 'MAIN_REFEREE',
  },
  {
    id: RefereeRole.ASSISTANT_REFEREE,
    name: 'ASSISTANT_REFEREE',
  },
  {
    id: RefereeRole.VAR,
    name: 'VAR',
  },
  {
    id: RefereeRole.FOURTH_OFFICIAL,
    name: 'FOURTH_OFFICIAL',
  },
]

export default RefereeRole
