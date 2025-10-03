import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ Login endpoint
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  // ✅ Register endpoint
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: 'FAN' | 'ARTIST',
  ) {
    if (!email || !password || !role) {
      throw new BadRequestException('Email, password, and role are required');
    }

    // role guard (only FAN or ARTIST allowed)
    if (role !== 'FAN' && role !== 'ARTIST') {
      throw new BadRequestException('Role must be FAN or ARTIST');
    }

    return this.authService.register(email, password, role);
  }
}

