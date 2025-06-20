import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { PrometheusService } from '@/pkg/core/monitoring/prometheus.service';

@Catch()
@Injectable()
export class MetricsExceptionFilter implements ExceptionFilter {
  constructor(private readonly _PrometheusService: PrometheusService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const method = request.method;
    const route = request.route?.path || request.url;
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Record error metrics
    this._PrometheusService.httpRequestsTotal
      .labels(method, route, statusCode.toString(), 'false')
      .inc(1);

    response.status(statusCode).json(exception.getResponse());
  }
}
