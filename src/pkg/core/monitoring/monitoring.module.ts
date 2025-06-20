import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MetricsController } from './metrics.controller';
import { MetricsInterceptor } from './metrics.interceptor';
import { PrometheusService } from './prometheus.service';

@Global()
@Module({
  controllers: [MetricsController],
  providers: [
    PrometheusService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
  exports: [PrometheusService],
})
export class MonitoringModule {}
