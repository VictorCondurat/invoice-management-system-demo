import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserWithoutPassword } from './auth.types';
import { FastifyRequest, FastifyReply } from 'fastify';

interface AuthRequest extends FastifyRequest {
  user: UserWithoutPassword;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const { access_token, user } = this.authService.login(req.user);

    reply.setCookie('jwt', access_token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return { user, access_token };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) reply: FastifyReply) {
    reply.clearCookie('jwt', {
      path: '/',
    });

    return { success: true };
  }
}