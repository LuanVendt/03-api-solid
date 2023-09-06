import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repostitory'

interface FetchNearByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymsUseCaseRespose {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseRespose> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
