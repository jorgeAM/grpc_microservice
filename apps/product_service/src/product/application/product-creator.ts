import { v4 as uuidv4 } from 'uuid'
import { Inject, Injectable } from '@nestjs/common'
import { Product, ProductRepository } from '../domain'

@Injectable()
export class ProductCreator {
  constructor(@Inject('ProductRepository') private readonly repository: ProductRepository) {}

  async run(name: string, sku: string, stock: number, price: number): Promise<string> {
    const productId = uuidv4()

    const product = new Product(productId, name, sku, stock, price)

    await this.repository.create(product)

    return productId
  }
}
