import { Inject, Injectable } from '@nestjs/common'
import { Product, ProductRepository } from '../domain'

@Injectable()
export class ProductFinder {
  constructor(@Inject('ProductRepository') private readonly repository: ProductRepository) {}

  run(id: string): Promise<Product> {
    return this.repository.findById(id)
  }
}
