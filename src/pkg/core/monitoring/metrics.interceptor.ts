import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

import { PrometheusService } from './prometheus.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly _PrometheusService: PrometheusService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const method = request.method;
    const route = request.route?.path || request.url;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = (Date.now() - startTime) / 1000;
        const statusCode = response.statusCode.toString();

        // Record metrics
        this._PrometheusService.httpRequestsTotal.labels(method, route, statusCode, 'true').inc(1);

        this._PrometheusService.httpRequestDuration
          .labels(method, route, statusCode)
          .observe(duration);
      }),
      catchError((error) => {
        const duration = (Date.now() - startTime) / 1000;
        const statusCode = error.status?.toString() || '500';

        // Record error metrics
        this._PrometheusService.httpRequestsTotal.labels(method, route, statusCode, 'false').inc(1);

        this._PrometheusService.httpRequestDuration
          .labels(method, route, statusCode)
          .observe(duration);

        throw error;
      }),
    );
  }
}
