import * as bcrypt from 'bcryptjs'
import { Inject, Injectable } from '@nestjs/common'
import { User, UserRepository } from '../domain'

@Injectable()
export class UserCreator {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  run(email: string, password: string): Promise<void> {
    const hash = this.encodePassword(password)

    const user = User.new(email, hash)

    return this.userRepository.create(user)
  }

  private encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt)
  }
}
