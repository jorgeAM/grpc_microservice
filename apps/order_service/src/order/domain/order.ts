import { v4 as uuidv4 } from 'uuid'

export class Order {
  constructor(readonly id: string, readonly productId: string, readonly quantity: number, readonly userId: string) {}

  static new(productId: string, quantity: number, userId: string): Order {
    return new Order(uuidv4(), productId, quantity, userId)
  }
}
