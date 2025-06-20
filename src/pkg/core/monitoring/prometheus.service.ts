import { Injectable, OnModuleInit } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService implements OnModuleInit {
  private httpHistogram: client.Histogram<string>;

  onModuleInit() {
    client.collectDefaultMetrics(); // nodejs metrics

    this.httpHistogram = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'API response time in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.3, 0.5, 1, 2, 5],
    });
  }

  startHttpTimer(labels: Record<string, string>) {
    return this.httpHistogram.startTimer(labels);
  }

  async getMetrics(): Promise<string> {
    return await client.register.metrics();
  }
}
