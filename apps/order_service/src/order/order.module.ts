import { Module } from '@nestjs/common'
import { OrderCreator } from './application'
import { OrderController, OrderPostgresRepository } from './infrastructure'

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderCreator,
    {
      provide: 'OrderRepository',
      useClass: OrderPostgresRepository,
    },
  ],
})
export class OrderModule {}
