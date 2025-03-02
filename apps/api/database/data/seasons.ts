import SeasonStatus from '#enums/season_status'

export const seasons = [
  {
    startDate: '2023-08-03',
    endDate: '2024-08-22',
    statusId: SeasonStatus.COMPLETED,
  },
  {
    startDate: '2024-12-23',
    endDate: '2025-08-02',
    statusId: SeasonStatus.ACTIVE,
  },
  {
    startDate: '2025-12-23',
    endDate: '2026-08-02',
    statusId: SeasonStatus.UPCOMING,
  },
]
