import { UsersRepository } from '@/repositories/users-reporsitory'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface GetUserProfileUserCaseRequest {
  userId: string
}

interface GetUserProfileUserCaseResponse {
  user: User
}

export class GetUserProfileUserCase {
  constructor(private usersRepostirory: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUserCaseRequest): Promise<GetUserProfileUserCaseResponse> {
    const user = await this.usersRepostirory.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
