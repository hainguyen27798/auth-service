import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { generateRequestId } from '@/pkg/helpers';

import { AppLoggerService } from './app-logger.service';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          // get userId from authorization
          const token = (req.headers?.['x-rtoken'] || req.headers?.['authorization'])?.split(
            '.',
          )?.[1];
          let userId: string;

          try {
            const decoded = JSON.parse(atob(token));
            userId = decoded.id;
          } catch {
            userId = 'Guest';
          }

          cls.set('userId', userId);
          cls.set('requestId', generateRequestId());
        },
      },
    }),
  ],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
