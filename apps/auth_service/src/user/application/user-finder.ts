import { Inject, Injectable } from '@nestjs/common'
import { User, UserNotFoundException, UserRepository } from '../domain'

@Injectable()
export class UserFinder {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async run(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundException('User not found')
    }

    return user
  }
}
