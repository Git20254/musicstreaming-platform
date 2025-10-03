import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Find a user by email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // ✅ Create a new user with validation and duplicate email handling
  async createUser(email: string, password: string, role: 'FAN' | 'ARTIST') {
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Basic password validation (min length, at least 1 number, 1 letter)
    if (password.length < 8 || !/[0-9]/.test(password) || !/[A-Za-z]/.test(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long and contain both letters and numbers',
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  // ✅ Fetch a user’s profile and stats
  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
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
        streams: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            createdAt: true,
            track: {
              select: {
                id: true,
                title: true,
                artist: true,
                artwork: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    // Count total streams for listening stats
    const totalStreams = await this.prisma.stream.count({
      where: { userId },
    });

    // Artist stats if role is ARTIST
    let artistStats: any = null;
    if (user.role === 'ARTIST') {
      const trackCount = await this.prisma.track.count({
        where: { artist: user.email },
      });
      const payoutSum = await this.prisma.payout.aggregate({
        where: { artistId: userId },
        _sum: { amount: true },
      });

      artistStats = {
        trackCount,
        totalPayout: payoutSum._sum.amount ?? 0,
      };
    }

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      subscriptionActive: user.subscriptionActive,
      profile: user.profile,
      listeningStats: {
        totalStreams,
        recentStreams: user.streams,
      },
      artistStats,
    };
  }
}

