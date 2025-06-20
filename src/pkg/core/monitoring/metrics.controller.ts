import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { PrometheusService } from '@/pkg/core/monitoring/prometheus.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly _PrometheusService: PrometheusService) {}

  @Get()
  async exposeMetrics(@Res() res: Response) {
    res.set('Content-Type', 'text/plain');
    res.send(await this._PrometheusService.getMetrics());
  }
}
