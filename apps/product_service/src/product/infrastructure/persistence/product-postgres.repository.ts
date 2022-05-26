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

    const data = res.rows[0]

    return data && this.toEntity(data)
  }

  async create(product: Product): Promise<void> {
    const { id, name, sku, stock, price } = product

    const queryText = 'INSERT INTO products(id, name, sku, stock, price) VALUES($1, $2, $3, $4, $5)'

    await this.client.query(queryText, [id, name, sku, stock, price])
  }

  async save(product: Product): Promise<void> {
    const { id, name, sku, stock, price } = product

    const queryText = 'UPDATE products SET name = $1, sku = $2, stock = $3, price = $4 WHERE id = $5'

    await this.client.query(queryText, [name, sku, stock, price, id])
  }

  private toEntity(data: ProductPostgres): Product {
    const { id, name, sku, stock, price } = data

    return new Product(id, name, sku, stock, price)
  }
}
