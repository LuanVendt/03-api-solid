import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { string } from 'zod'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registeruseCase = new RegisterUseCase(usersRepository)

    const { user } = await registeruseCase.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upan registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registeruseCase = new RegisterUseCase(usersRepository)

    const { user } = await registeruseCase.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register wwith same e-mail twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registeruseCase = new RegisterUseCase(usersRepository)

    const email = 'john@example.com'

    await registeruseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registeruseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
