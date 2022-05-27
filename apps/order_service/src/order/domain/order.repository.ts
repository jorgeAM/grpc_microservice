import { Order } from './order'

export interface OrderRepository {
  create(order: Order): Promise<void>
}
