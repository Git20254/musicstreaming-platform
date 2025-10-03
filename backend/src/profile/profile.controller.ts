import {
  Controller,
  Get,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { UploadService } from '../upload/upload.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly uploadService: UploadService,
  ) {}

  // ✅ Fetch current profile
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req) {
    return this.profileService.getProfile(req.user.userId); // 🔑 use userId
  }

  // ✅ Upload avatar
  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    console.log('🔍 JWT Payload:', req.user);

    const userId = req.user?.userId; // 🔑 FIXED: token gives userId, not sub
    if (!userId) {
      throw new Error('User ID not found in token payload');
    }

    const { original, sizes } = await this.uploadService.uploadImage(file);
    return this.profileService.updateAvatar(userId, original, sizes);
  }
}

