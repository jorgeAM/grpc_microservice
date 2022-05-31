import { verify } from 'jsonwebtoken'
import { Inject, Injectable } from '@nestjs/common'
import { User, UserNotFoundException, UserRepository } from '../domain'

@Injectable()
export class UserValidator {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async run(token: string): Promise<User> {
    const payload = verify(token, 'secret')

    const user = await this.userRepository.findByEmail(payload['email'] as string)

    if (!user) {
      throw new UserNotFoundException('Email or password are wrong')
    }

    return user
  }
}
