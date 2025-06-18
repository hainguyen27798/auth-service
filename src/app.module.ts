import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Configuration } from '@/configs';
import { UserModule } from '@/modules/user/user.module';
import { AppLoggerModule } from '@/pkg/core/app-logger';
import { AuthHelperModule } from '@/pkg/core/auth-helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration.init],
    }),
    AppLoggerModule,
    AuthHelperModule,
    UserModule,
  ],
})
export class AppModule {}
