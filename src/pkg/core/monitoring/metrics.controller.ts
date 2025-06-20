import { Controller, Get, Header } from '@nestjs/common';

import { PrometheusService } from './prometheus.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly _PrometheusService: PrometheusService) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  async exposeMetrics() {
    return this._PrometheusService.getMetrics();
  }
}
