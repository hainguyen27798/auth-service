import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { PrometheusService } from '@/pkg/core/monitoring/prometheus.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly _PrometheusService: PrometheusService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const route = request.route?.path || request.url;

    const end = this._PrometheusService.startHttpTimer({ method, route });

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        end({ status: String(response.statusCode) });
      }),
    );
  }
}
