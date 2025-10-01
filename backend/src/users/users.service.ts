import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get all users
  getAll() {
    return this.prisma.user.findMany();
  }

  // Create a new user
  create(email: string, name?: string) {
    return this.prisma.user.create({
      data: { email, name },
    });
  }
}

