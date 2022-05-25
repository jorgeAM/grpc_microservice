import { Client } from 'pg'
import { Injectable } from '@nestjs/common'
import { StockDecreaseLog, StockDecreaseLogRepository } from '../../domain'

interface StockDecreaseLogPostgres {
  id: string
  orderid: string
  productid: string
}

@Injectable()
export class StockDecreaseLogPostgresRepository implements StockDecreaseLogRepository {
  private readonly client: Client

  constructor() {
    this.client = new Client({
      user: 'admin',
      host: '127.0.0.1',
      database: 'micro_product',
      password: '123456',
      port: 5432,
      ssl: false,
    })

    this.client.connect()
  }

  async create(log: StockDecreaseLog): Promise<void> {
    const { id, orderId, productId } = log

    const queryText = 'INSERT INTO stock_decrease_logs(id, orderid, productid) VALUES($1, $2, $3)'

    await this.client.query(queryText, [id, orderId, productId])
  }

  private toEntity(data: StockDecreaseLogPostgres): StockDecreaseLog {
    const { id, orderid, productid } = data

    return new StockDecreaseLog(id, orderid, productid)
  }
}
