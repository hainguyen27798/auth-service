import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';

import { MetricsExceptionFilter } from '@/pkg/core/monitoring/metrics-exception.filter';

import { HealthController } from './health.controller';
import { MetricsController } from './metrics.controller';
import { MetricsInterceptor } from './metrics.interceptor';
import { PrometheusService } from './prometheus.service';

@Global()
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
