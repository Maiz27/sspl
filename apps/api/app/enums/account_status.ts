enum AccountStatus {
  ACTIVE = 1,
  SUSPENDED = 2,
  DEACTIVATED = 3,
  BANNED = 4,
  PENDING_VERIFICATION = 5,
}

export const accountStatusValues = [
  {
    id: AccountStatus.ACTIVE,
    name: 'ACTIVE',
  },
  {
    id: AccountStatus.SUSPENDED,
    name: 'SUSPENDED',
  },
  {
    id: AccountStatus.DEACTIVATED,
    name: 'DEACTIVATED',
  },
  {
    id: AccountStatus.BANNED,
    name: 'BANNED',
  },
  {
    id: AccountStatus.PENDING_VERIFICATION,
    name: 'PENDING_VERIFICATION',
  },
]

export default AccountStatus
