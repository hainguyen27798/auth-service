import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { Configuration } from '@/configs';
import { AppLoggerService } from '@/pkg/core/app-logger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // init logger
  AppLoggerService.init();
  app.useLogger(app.get(AppLoggerService));

  // apply http logger
  app.use(AppLoggerService.morganMiddleware);

  await app.listen(Configuration.instance.server.port);
}

bootstrap()
  .then(() => {
    Logger.log(
      `Server running at: http://localhost:${Configuration.instance.server.port}`,
      'Bootstrap',
    );
  })
  .catch((reason) => {
    Logger.error(`Server occurred error: ${reason.message}`, reason.stack, 'Bootstrap');
  });
