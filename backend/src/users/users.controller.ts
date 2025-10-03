import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma.service';

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        role: true,
        subscriptionActive: true,
        profile: {
          select: {
            bio: true,
            avatarUrl: true,
            avatarSizes: true,
          },
        },
      },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      subscriptionActive: user.subscriptionActive,
      bio: user.profile?.bio ?? null,
      avatarUrl: user.profile?.avatarUrl ?? null,
      avatarSizes: user.profile?.avatarSizes ?? null,
    };
  }
}

