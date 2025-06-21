import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Counter, Gauge, Histogram, register } from 'prom-client';

@Injectable()
export class PrometheusService {
  // HTTP Request metrics
  public readonly httpRequestsTotal = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code', 'success'],
  });

  public readonly httpRequestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  });

  // Application metrics
  public readonly activeConnections = new Gauge({
    name: 'active_connections',
    help: 'Number of active connections',
  });

  public readonly databaseConnections = new Gauge({
    name: 'database_connections_active',
    help: 'Number of active database connections',
  });

  private readonly appVersion = new Gauge({
    name: 'app_version',
    help: 'current application version (package.json > version)',
    labelNames: ['version'],
  });

  // Custom business metrics
  public readonly businessOperationsTotal = new Counter({
    name: 'business_operations_total',
    help: 'Total number of business operations',
    labelNames: ['operation_type', 'status'],
  });

  public readonly queueSize = new Gauge({
    name: 'queue_size',
    help: 'Current queue size',
    labelNames: ['queue_name'],
  });

  // Memory and CPU metrics (collected automatically)
  constructor() {
    // Collect default metrics (CPU, memory, etc.)
    collectDefaultMetrics({
      register,
      prefix: 'nodejs_',
    });
  }

  getMetrics() {
    return register.metrics();
  }

  getContentType() {
    return register.contentType;
  }

  setAppVersion(version?: string) {
    this.appVersion.set({ version }, version ? 1 : 0);
  }
}
