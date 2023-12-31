import { IResponseType } from '@/src/common/type/IResponse.type';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { sessionConst } from './const/session.const';
import { AuthenticatedDto } from './dto/authenticated.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @TypedRoute.Post()
  async authenticated(
    @TypedBody() dto: AuthenticatedDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<IResponseType> {
    const jwt = await this.authService.authenticatedUser(dto);
    console.log(
      '🚀 ~ file: auth.controller.ts:25 ~ AuthController ~ jwt:',
      jwt,
    );
    response.setCookie(sessionConst.session_name_cookie, jwt);
    return {
      statusCode: HttpStatus.OK,
      message: 'User authenticated',
    };
  }
}
