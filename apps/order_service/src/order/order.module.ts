import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { OrderCreator } from './application'
import { OrderController, OrderPostgresRepository } from './infrastructure'
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './infrastructure/grpc/product.pb'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: PRODUCT_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/product.proto'),
        },
      },
    ]),
  ],
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
