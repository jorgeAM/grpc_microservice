import { Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { AuthGuard } from '../auth/auth.guard'
import { CreateOrderRequest, CreateOrderResponse, OrderServiceClient, ORDER_SERVICE_NAME } from './order.pb'

@Controller('order')
export class OrderController implements OnModuleInit {
  private orderServiceClient: OrderServiceClient

  constructor(@Inject(ORDER_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.orderServiceClient = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME)
  }

  @Post()
  // @UseGuards(AuthGuard)
  createOrder(@Body() body: CreateOrderRequest, @Req() req: Request): Observable<CreateOrderResponse> {
    // body.userId = req['user'] as string

    return this.orderServiceClient.create(body)
  }
}
