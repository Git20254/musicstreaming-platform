import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamsModule } from './streams/streams.module';
import { TracksModule } from './tracks/tracks.module';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    StreamsModule,
    TracksModule,   // ✅ add TracksModule here
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RedisService,   // ✅ Redis stays here
  ],
})
export class AppModule {}

