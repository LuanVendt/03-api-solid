import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
  })

  // vi.useFakeTimers()

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    console.log(createdCheckIn)

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validate_at).toEqual(expect.any(Date))
    expect(checkInsRepository.itens[0].validate_at).toEqual(expect.any(Date))
  })

  it('should be not be able to validate an inexistant check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistant-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
