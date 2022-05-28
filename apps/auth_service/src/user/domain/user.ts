import { v4 as uuidv4 } from 'uuid'

export class User {
  constructor(readonly id: string, readonly email: string, readonly password: string) {}

  static new(email: string, password: string): User {
    return new User(uuidv4(), email, password)
  }
}
