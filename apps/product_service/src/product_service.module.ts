import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module'
import { StockDecreaseLogModule } from './stock-decrease-log/stock-decrease-log.module'

@Module({
  imports: [ProductModule, StockDecreaseLogModule],
  controllers: [],
  providers: [],
})
export class ProductServiceModule {}
