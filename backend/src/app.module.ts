import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    AuthModule,
    PaymentsModule,
    WebhooksModule,   // ✅ add TracksModule here
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RedisService,   // ✅ Redis stays here
  ],
})
export class AppModule {}

