enum UserRole {
  USER = 1,
  MODERATOR = 2,
  ADMIN = 3,
}

export const userRoleValues = [
  {
    id: UserRole.USER,
    name: 'USER',
  },
  {
    id: UserRole.MODERATOR,
    name: 'MODERATOR',
  },
  {
    id: UserRole.ADMIN,
    name: 'ADMIN',
  },
]

export default UserRole
