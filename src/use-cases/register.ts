import { UsersRepository } from '@/repositories/users-reporsitory'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWhitSameEmail = await this.usersRepository.findByEmail(email)

    if (userWhitSameEmail) {
      throw new Error('E-mail already exist.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
