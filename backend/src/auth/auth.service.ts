import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ✅ Validate credentials
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // remove password before returning
    const { password: _, ...result } = user;
    return result;
  }

  // ✅ Login: issues JWT with sub = user.id
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // ✅ Register: handles validation + duplicate email gracefully
  async register(email: string, password: string, role: 'FAN' | 'ARTIST') {
    try {
      const user = await this.usersService.createUser(email, password, role);
      return this.login(user);
    } catch (error: any) {
      if (error.response?.message) {
        // forward clean error message from UsersService
        throw new BadRequestException(error.response.message);
      }
      throw error;
    }
  }
}

