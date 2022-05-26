import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'
import { Controller, HttpStatus } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { ProductCreator, ProductFinder, StockDecreaser } from '../../application'
import {
  CreateProductRequest,
  CreateProductResponse,
  DecreaseStockRequest,
  DecreaseStockResponse,
  FindOneRequest,
  FindOneResponse,
} from '../grpc/product.pb'

@Controller()
export class ProductController {
  constructor(
    private readonly productCreator: ProductCreator,
    private readonly productFinder: ProductFinder,
    private readonly stockDecreaser: StockDecreaser,
  ) {}

  @GrpcMethod('ProductService')
  async create(
    data: CreateProductRequest,
    metadata: Metadata,
    call: ServerUnaryCall<CreateProductRequest, CreateProductResponse>,
  ): Promise<CreateProductResponse> {
    const { name, sku, stock, price } = data

    const productId = await this.productCreator.run(name, sku, stock, price)

    return {
      status: HttpStatus.OK,
      error: null,
      id: productId,
    }
  }

  @GrpcMethod('ProductService')
  async findById(
    data: FindOneRequest,
    metadata: Metadata,
    call: ServerUnaryCall<FindOneRequest, FindOneResponse>,
  ): Promise<FindOneResponse> {
    const { id } = data

    const product = await this.productFinder.run(id)

    if (!product) {
      return { data: null, error: ['Product not found'], status: HttpStatus.NOT_FOUND }
    }

    return { data: product, error: null, status: HttpStatus.OK }
  }

  @GrpcMethod('ProductService')
  async decreaseStock(
    data: DecreaseStockRequest,
    metadata: Metadata,
    call: ServerUnaryCall<DecreaseStockRequest, DecreaseStockResponse>,
  ): Promise<DecreaseStockResponse> {
    const { id } = data

    await this.stockDecreaser.run(id)

    return { error: null, status: HttpStatus.OK }
  }
}
