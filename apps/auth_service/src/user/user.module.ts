import { Module } from '@nestjs/common'
import { UserCreator, UserFinder } from './application'

@Module({
  imports: [],
  controllers: [],
  providers: [UserCreator, UserFinder],
})
export class UserModule {}
