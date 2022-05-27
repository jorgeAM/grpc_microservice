import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { ProductNotFoundException, ProductOutOfStockException } from './../../../../product_service/src/product/domain'
import { firstValueFrom } from 'rxjs'
import { Order, OrderRepository } from '../domain'
import { FindOneResponse, ProductServiceClient, PRODUCT_SERVICE_NAME } from '../infrastructure/grpc/product.pb'

@Injectable()
export class OrderCreator implements OnModuleInit {
  private productServiceClient: ProductServiceClient

  constructor(
    @Inject(PRODUCT_SERVICE_NAME) private readonly client: ClientGrpc,
    @Inject('OrderRepository') private readonly orderRepository: OrderRepository,
  ) {}

  onModuleInit() {
    this.productServiceClient = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
  }

  async run(productId: string, quantity: number, userId: string): Promise<string> {
    const response: FindOneResponse = await firstValueFrom(this.productServiceClient.findById({ id: productId }))

    if (response.status !== HttpStatus.OK) {
      throw new ProductNotFoundException('Product not found')
    }

    if (response?.data?.stock <= 0) {
      throw new ProductOutOfStockException('Product out of stock')
    }

    const order = Order.new(productId, quantity, userId)

    await this.orderRepository.create(order)

    return order.id
  }
}
