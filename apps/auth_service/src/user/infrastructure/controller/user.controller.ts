import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'
import { Controller, HttpStatus } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { UserCreator, UserTokenGenerator, UserValidator } from '../../application'
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ValidateRequest, ValidateResponse } from '../grpc/auth.pb'

@Controller()
export class UserController {
  constructor(
    private readonly userCreator: UserCreator,
    private readonly userTokenGenerator: UserTokenGenerator,
    private readonly userValidator: UserValidator,
  ) {}

  @GrpcMethod('AuthService')
  async register(
    data: RegisterRequest,
    metadata: Metadata,
    call: ServerUnaryCall<RegisterRequest, RegisterResponse>,
  ): Promise<RegisterResponse> {
    const { email, password } = data

    await this.userCreator.run(email, password)

    return {
      status: HttpStatus.OK,
      error: null,
    }
  }

  @GrpcMethod('AuthService')
  async login(data: LoginRequest, metadata: Metadata, call: ServerUnaryCall<LoginRequest, LoginResponse>): Promise<LoginResponse> {
    const { email, password } = data

    const token = await this.userTokenGenerator.run(email, password)

    return {
      status: HttpStatus.OK,
      error: null,
      token,
    }
  }
  @GrpcMethod('AuthService')
  async validate(
    data: ValidateRequest,
    metadata: Metadata,
    call: ServerUnaryCall<ValidateRequest, ValidateResponse>,
  ): Promise<ValidateResponse> {
    const { token } = data

    const user = await this.userValidator.run(token)

    return {
      status: HttpStatus.OK,
      error: null,
      userId: (await user).id,
    }
  }
}
