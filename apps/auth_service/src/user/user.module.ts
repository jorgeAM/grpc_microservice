import { Module } from '@nestjs/common'
import { UserCreator, UserTokenGenerator, UserValidator } from './application'
import { UserController, UserPostgresRepository } from './infrastructure'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserCreator,
    UserValidator,
    UserTokenGenerator,
    {
      provide: 'UserRepository',
      useClass: UserPostgresRepository,
    },
  ],
})
export class UserModule {}
