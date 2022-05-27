import { Inject, Injectable } from '@nestjs/common'
import { Order, OrderRepository } from '../domain'

@Injectable()
export class OrderCreator {
  constructor(@Inject('OrderRepository') private readonly orderRepository: OrderRepository) {}

  async run(productId: string, quantity: number, userId: string): Promise<string> {
    const order = Order.new(productId, quantity, userId)

    await this.orderRepository.create(order)

    return order.id
  }
}
