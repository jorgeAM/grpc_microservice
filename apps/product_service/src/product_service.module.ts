import { Module } from '@nestjs/common';
import { ProductServiceController } from './product_service.controller';
import { ProductServiceService } from './product_service.service';

@Module({
  imports: [],
  controllers: [ProductServiceController],
  providers: [ProductServiceService],
})
export class ProductServiceModule {}
