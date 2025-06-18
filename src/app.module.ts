import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Configuration } from '@/configs';
import { AppLoggerModule } from '@/pkg/app-logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration.init],
    }),
    AppLoggerModule,
  ],
})
export class AppModule {}
