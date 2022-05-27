import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { ORDER_PACKAGE_NAME } from './order/infrastructure'
import { OrderServiceModule } from './order_service.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderServiceModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50053',
      package: ORDER_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/order.proto'),
    },
  })

  await app.listen()
}
bootstrap()
