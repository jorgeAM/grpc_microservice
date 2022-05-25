import { Module } from '@nestjs/common';
import { ProductServiceController } from './product_service.controller';
import { ProductServiceService } from './product_service.service';
import { ProductModule } from './product/product.module';
import { StockDecreaseLogModule } from './stock-decrease-log/stock-decrease-log.module';

@Module({
  imports: [ProductModule, StockDecreaseLogModule],
  controllers: [ProductServiceController],
  providers: [ProductServiceService],
})
export class ProductServiceModule {}
