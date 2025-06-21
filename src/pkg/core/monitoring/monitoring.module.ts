import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';
import { MetricsController } from './metrics.controller';
import { MetricsInterceptor } from './metrics.interceptor';
import { MetricsExceptionFilter } from './metrics-exception.filter';
import { PrometheusService } from './prometheus.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [MetricsController, HealthController],
  providers: [
    PrometheusService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: MetricsExceptionFilter,
    },
  ],
  exports: [PrometheusService],
})
export class MonitoringModule {}
