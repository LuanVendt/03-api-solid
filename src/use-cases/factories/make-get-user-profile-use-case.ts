import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUserCase } from '../get-user-profile'

export function MakeGetUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUserCase(userRepository)

  return useCase
}
