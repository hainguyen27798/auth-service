import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { PrometheusService } from './prometheus.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private _http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private _prometheusService: PrometheusService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
