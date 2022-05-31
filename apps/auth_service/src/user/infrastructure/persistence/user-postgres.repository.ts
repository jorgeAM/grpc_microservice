import { Client } from 'pg'
import { User, UserRepository } from '../../domain'

interface UserPostgres {
  id: string
  email: string
  password: string
}

export class UserPostgresRepository implements UserRepository {
  private readonly client: Client

  constructor() {
    this.client = new Client({
      user: 'admin',
      host: '127.0.0.1',
      database: 'micro_auth',
      password: '123456',
      port: 5432,
      ssl: false,
    })

    this.client.connect()
  }

  async create(user: User): Promise<void> {
    const { id, email, password } = user

    const queryText = 'INSERT INTO users(id, email, password) VALUES($1, $2, $3)'

    await this.client.query(queryText, [id, email, password])
  }

  async findByEmail(email: string): Promise<User> {
    const res = await this.client.query<UserPostgres>('SELECT * FROM users WHERE email = $1', [email])

    const data = res.rows[0]

    return data && this.toEntity(data)
  }

  private toEntity(data: UserPostgres): User {
    const { id, email, password } = data

    return new User(id, email, password)
  }
}
