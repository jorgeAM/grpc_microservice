import { Module } from '@nestjs/common'
import { ProductCreator, ProductFinder, StockDecreaser } from './application'
import { ProductController, ProductPostgresRepository } from './infrastructure'

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductCreator,
    ProductFinder,
    StockDecreaser,
    {
      provide: 'ProductRepository',
      useClass: ProductPostgresRepository,
    },
  ],
})
export class ProductModule {}
