import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma.module'; // ✅ Import PrismaModule

@Module({
  imports: [PrismaModule], // ✅ so UsersService can use PrismaService
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // ✅ export UsersService so AuthModule and others can use it
})
export class UsersModule {}

