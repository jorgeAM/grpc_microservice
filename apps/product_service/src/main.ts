import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { PRODUCT_PACKAGE_NAME } from './product/infrastructure'
import { ProductServiceModule } from './product_service.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductServiceModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50052',
      package: PRODUCT_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/product.proto'),
    },
  })

  await app.listen()
}
bootstrap()
