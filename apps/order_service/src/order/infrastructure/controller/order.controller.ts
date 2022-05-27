import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'
import { Controller, HttpStatus } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { OrderCreator } from '../../application'
import { CreateOrderRequest, CreateOrderResponse } from '../grpc/order.pb'

@Controller()
export class OrderController {
  constructor(private readonly orderCreator: OrderCreator) {}

  @GrpcMethod('OrderService')
  async create(
    data: CreateOrderRequest,
    metadata: Metadata,
    call: ServerUnaryCall<CreateOrderRequest, CreateOrderResponse>,
  ): Promise<CreateOrderResponse> {
    const { productId, quantity, userId } = data

    const orderId = await this.orderCreator.run(productId, quantity, userId)

    return {
      status: HttpStatus.OK,
      error: null,
      id: orderId,
    }
  }
}
