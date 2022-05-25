import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { AuthServiceClient, AUTH_SERVICE_NAME, ValidateResponse } from './auth.pb'

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceClient: AuthServiceClient

  constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
  }

  validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.authServiceClient.validate({ token }))
  }
}
