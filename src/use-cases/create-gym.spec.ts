import { expect, describe, it, beforeEach } from 'vitest'
import { IneMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: IneMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    gymsRepository = new IneMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym 03',
      description: null,
      phone: null,
      latitude: -27.8747279,
      longitude: -49.4889672,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
