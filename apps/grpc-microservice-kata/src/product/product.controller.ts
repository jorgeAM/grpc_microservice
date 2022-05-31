import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, UseGuards } from '@nestjs/common'
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
    return this.productServiceClient.create(body)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string): Observable<FindOneResponse> {
    return this.productServiceClient.findById({ id })
  }
}
