import * as bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Inject, Injectable } from '@nestjs/common'
import { User, UserNotFoundException, UserRepository } from '../domain'

@Injectable()
export class UserTokenGenerator {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async run(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundException('Email or password are wrong')
    }

    const isValid = this.isValidPassword(password, user.password)

    if (!isValid) {
      throw new UserNotFoundException('Email or password are wrong')
    }

    return this.generateToken(user)
  }

  private generateToken(user: User): string {
    return sign({ id: user.id, email: user.email }, 'secret')
  }

  private isValidPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }
}
