import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ProfileModule } from './profile/profile.module';
import { CloudinaryModule } from './cloudinary.module';  // 👈 import new CloudinaryModule

@Module({
  imports: [
    AuthModule,
    PaymentsModule,
    WebhooksModule,
    ProfileModule,
    CloudinaryModule,   // 👈 register it here
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}

