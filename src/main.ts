import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DefaultPlayerService } from './hit-points/default-player/default-player.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultPlayerService = app.get(DefaultPlayerService);

  await defaultPlayerService.deleteDefaultPlayer();
  await defaultPlayerService.createDefaultPlayer();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('DnD Challenge API')
    .setDescription('DnD Challenge API')
    .setVersion('1.0')
    .addTag('dnd')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
