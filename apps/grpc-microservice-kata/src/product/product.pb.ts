/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'
import { Observable } from 'rxjs'

export const protobufPackage = 'product'

export interface CreateProductRequest {
  name: string
  sku: string
  stock: number
  price: number
}

export interface CreateProductResponse {
  status: number
  error: string[]
  id: string
}

export interface Product {
  id: string
  name: string
  sku: string
  stock: number
  price: number
}

export interface FindOneRequest {
  id: string
}

export interface FindOneResponse {
  status: number
  error: string[]
  data: Product | undefined
}

export interface DecreaseStockRequest {
  id: string
}

export interface DecreaseStockResponse {
  status: number
  error: string[]
}

export const PRODUCT_PACKAGE_NAME = 'product'

export interface ProductServiceClient {
  create(request: CreateProductRequest): Observable<CreateProductResponse>

  findById(request: FindOneRequest): Observable<FindOneResponse>

  decreaseStock(request: DecreaseStockRequest): Observable<DecreaseStockResponse>
}

export interface ProductServiceController {
  create(request: CreateProductRequest): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse

  findById(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse

  decreaseStock(
    request: DecreaseStockRequest,
  ): Promise<DecreaseStockResponse> | Observable<DecreaseStockResponse> | DecreaseStockResponse
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'findById', 'decreaseStock']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('ProductService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('ProductService', method)(constructor.prototype[method], method, descriptor)
    }
  }
}

export const PRODUCT_SERVICE_NAME = 'ProductService'

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
