enum PlayerPositionCategory {
  GOALKEEPER = 1,
  DEFENDER = 2,
  MIDFIELDER = 3,
  FORWARD = 4,
}

enum PlayerPosition {
  // Goalkeepers
  GK = 101,

  // Defenders
  CB = 201, // Center Back
  LB = 202, // Left Back
  RB = 203, // Right Back
  LWB = 204, // Left Wing Back
  RWB = 205, // Right Wing Back
  SW = 206, // Sweeper

  // Midfielders
  CDM = 301, // Defensive Midfielder
  CM = 302, // Central Midfielder
  CAM = 303, // Attacking Midfielder
  LM = 304, // Left Midfielder
  RM = 305, // Right Midfielder

  // Forwards
  LW = 401, // Left Winger
  RW = 402, // Right Winger
  SS = 403, // Second Striker
  CF = 404, // Center Forward
  ST = 405, // Striker
}

// Map specific positions to their categories
export const positionToCategory = {
  [PlayerPosition.GK]: PlayerPositionCategory.GOALKEEPER,

  [PlayerPosition.CB]: PlayerPositionCategory.DEFENDER,
  [PlayerPosition.LB]: PlayerPositionCategory.DEFENDER,
  [PlayerPosition.RB]: PlayerPositionCategory.DEFENDER,

  [PlayerPosition.CDM]: PlayerPositionCategory.MIDFIELDER,
  [PlayerPosition.CM]: PlayerPositionCategory.MIDFIELDER,
  [PlayerPosition.CAM]: PlayerPositionCategory.MIDFIELDER,
  [PlayerPosition.LM]: PlayerPositionCategory.MIDFIELDER,
  [PlayerPosition.RM]: PlayerPositionCategory.MIDFIELDER,

  [PlayerPosition.LW]: PlayerPositionCategory.FORWARD,
  [PlayerPosition.RW]: PlayerPositionCategory.FORWARD,
  [PlayerPosition.SS]: PlayerPositionCategory.FORWARD,
  [PlayerPosition.CF]: PlayerPositionCategory.FORWARD,
  [PlayerPosition.ST]: PlayerPositionCategory.FORWARD,
}

export const playerPositionValues = [
  {
    id: PlayerPosition.GK,
    name: 'GK',
    display_name: 'Goalkeeper',
    category_id: PlayerPositionCategory.GOALKEEPER,
  },

  {
    id: PlayerPosition.CB,
    name: 'CB',
    display_name: 'Center Back',
    category_id: PlayerPositionCategory.DEFENDER,
  },
  {
    id: PlayerPosition.LB,
    name: 'LB',
    display_name: 'Left Back',
    category_id: PlayerPositionCategory.DEFENDER,
  },
  {
    id: PlayerPosition.RB,
    name: 'RB',
    display_name: 'Right Back',
    category_id: PlayerPositionCategory.DEFENDER,
  },
  {
    id: PlayerPosition.CDM,
    name: 'CDM',
    display_name: 'Defensive Midfielder',
    category_id: PlayerPositionCategory.MIDFIELDER,
  },
  {
    id: PlayerPosition.CM,
    name: 'CM',
    display_name: 'Central Midfielder',
    category_id: PlayerPositionCategory.MIDFIELDER,
  },
  {
    id: PlayerPosition.CAM,
    name: 'CAM',
    display_name: 'Attacking Midfielder',
    category_id: PlayerPositionCategory.MIDFIELDER,
  },
  {
    id: PlayerPosition.LM,
    name: 'LM',
    display_name: 'Left Midfielder',
    category_id: PlayerPositionCategory.MIDFIELDER,
  },
  {
    id: PlayerPosition.RM,
    name: 'RM',
    display_name: 'Right Midfielder',
    category_id: PlayerPositionCategory.MIDFIELDER,
  },

  {
    id: PlayerPosition.LW,
    name: 'LW',
    display_name: 'Left Winger',
    category_id: PlayerPositionCategory.FORWARD,
  },
  {
    id: PlayerPosition.RW,
    name: 'RW',
    display_name: 'Right Winger',
    category_id: PlayerPositionCategory.FORWARD,
  },
  {
    id: PlayerPosition.SS,
    name: 'SS',
    display_name: 'Second Striker',
    category_id: PlayerPositionCategory.FORWARD,
  },
  {
    id: PlayerPosition.CF,
    name: 'CF',
    display_name: 'Center Forward',
    category_id: PlayerPositionCategory.FORWARD,
  },
  {
    id: PlayerPosition.ST,
    name: 'ST',
    display_name: 'Striker',
    category_id: PlayerPositionCategory.FORWARD,
  },
]

export const playerPositionCategoryValues = [
  { id: PlayerPositionCategory.GOALKEEPER, name: 'GOALKEEPER' },
  { id: PlayerPositionCategory.DEFENDER, name: 'DEFENDER' },
  { id: PlayerPositionCategory.MIDFIELDER, name: 'MIDFIELDER' },
  { id: PlayerPositionCategory.FORWARD, name: 'FORWARD' },
]

export default PlayerPosition
export { PlayerPositionCategory }
