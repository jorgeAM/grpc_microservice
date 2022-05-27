import { Client } from 'pg'
import { Injectable } from '@nestjs/common'
import { Order, OrderRepository } from '../../domain'

interface OrderPostgres {
  id: string
  productid: string
  quantity: number
  userid: string
}

@Injectable()
export class OrderPostgresRepository implements OrderRepository {
  private readonly client: Client

  constructor() {
    this.client = new Client({
      user: 'admin',
      host: '127.0.0.1',
      database: 'micro_order',
      password: '123456',
      port: 5432,
      ssl: false,
    })

    this.client.connect()
  }

  async create(order: Order): Promise<void> {
    const { id, productId, quantity, userId } = order

    const queryText = 'INSERT INTO orders(id, productid, quantity, userid) VALUES($1, $2, $3, $4)'

    await this.client.query(queryText, [id, productId, quantity, userId])
  }

  private toEntity(data: OrderPostgres): Order {
    const { id, productid, quantity, userid } = data

    return new Order(id, productid, quantity, userid)
  }
}
