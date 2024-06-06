import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HitPointsModule } from './hit-points/hit-points.module';

@Module({
  imports: [HitPointsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
