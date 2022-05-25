import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { AuthGuard } from '../auth/auth.guard'
import {
  CreateProductRequest,
  CreateProductResponse,
  FindOneResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
} from './product.pb'

@Controller('product')
export class ProductController implements OnModuleInit {
  private productServiceClient: ProductServiceClient

  constructor(@Inject(PRODUCT_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productServiceClient = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() body: CreateProductRequest): Observable<CreateProductResponse> {
    return this.productServiceClient.createProduct(body)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Observable<FindOneResponse> {
    return this.productServiceClient.findOne({ id })
  }
}
