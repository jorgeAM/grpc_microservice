import { Client } from 'pg'
import { Injectable } from '@nestjs/common'
import { Product, ProductNotFoundException, ProductRepository } from '../../domain'

interface ProductPostgres {
  id: string
  name: string
  sku: string
  stock: number
  price: number
}

@Injectable()
export class ProductPostgresRepository implements ProductRepository {
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

  async findById(id: string): Promise<Product> {
    const res = await this.client.query<ProductPostgres>('SELECT * FROM products WHERE id = $1', [id])

    if (res.rows.length === 0) {
      throw new ProductNotFoundException('Product not found')
    }

    const data = res.rows[0]

    return this.toEntity(data)
  }

  async create(product: Product): Promise<void> {
    const { id, name, sku, stock, price } = product

    const queryText = 'INSERT INTO users(id, name, sku, stock, price) VALUES($1, $2, $3, $4, $5)'

    await this.client.query(queryText, [id, name, sku, stock, price])
  }

  private toEntity(data: ProductPostgres): Product {
    const { id, name, sku, stock, price } = data

    return new Product(id, name, sku, stock, price)
  }
}
