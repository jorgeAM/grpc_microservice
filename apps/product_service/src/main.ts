import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product_service.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductServiceModule);
  await app.listen(3000);
}
bootstrap();
