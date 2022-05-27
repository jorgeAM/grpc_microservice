/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'
import { Observable } from 'rxjs'

export const protobufPackage = 'order'

export interface CreateOrderRequest {
  productId: string
  quantity: number
  userId: string
}

export interface CreateOrderResponse {
  status: number
  error: string[]
  id: string
}

export const ORDER_PACKAGE_NAME = 'order'

export interface OrderServiceClient {
  create(request: CreateOrderRequest): Observable<CreateOrderResponse>
}

export interface OrderServiceController {
  create(request: CreateOrderRequest): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('OrderService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('OrderService', method)(constructor.prototype[method], method, descriptor)
    }
  }
}

export const ORDER_SERVICE_NAME = 'OrderService'

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
