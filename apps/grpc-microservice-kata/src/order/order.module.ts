import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { AuthModule } from '../auth/auth.module'
import { OrderController } from './order.controller'
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './order.pb'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: ORDER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/order.proto'),
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
