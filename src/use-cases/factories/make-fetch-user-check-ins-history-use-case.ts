import { PrismaCheckInsRepostitory } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInHistoryUseCase } from '../fatch-user-check-ins-history'

export function MakeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepostitory()
  const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository)

  return useCase
}
