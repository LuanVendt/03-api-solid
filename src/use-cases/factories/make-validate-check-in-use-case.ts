import { PrismaCheckInsRepostitory } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function MakeValidatedCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepostitory()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
