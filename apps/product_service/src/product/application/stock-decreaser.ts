import { Inject, Injectable } from '@nestjs/common'
import { ProductNotFoundException, ProductOutOfStockException, ProductRepository } from '../domain'

@Injectable()
export class StockDecreaser {
  constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) {}

  async run(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new ProductNotFoundException('Product not found')
    }

    if (product.stock <= 0) {
      throw new ProductOutOfStockException('Product does not have stock')
    }

    product.decreaseStock()

    await this.productRepository.save(product)
  }
}
