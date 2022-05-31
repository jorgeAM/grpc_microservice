import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ValidateRequest,
  ValidateResponse,
} from './auth.pb'

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authServiceClient: AuthServiceClient

  constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
  }

  @Post('register')
  register(@Body() body: RegisterRequest): Observable<RegisterResponse> {
    return this.authServiceClient.register(body)
  }

  @Get('login')
  login(@Body() body: LoginRequest): Observable<LoginResponse> {
    return this.authServiceClient.login(body)
  }
}
