import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const isDev = process.env.NODE_ENV === 'development';
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const cause = exception.cause as Record<string, string>;
    const stack = exception.stack;

    const requestBody = request.body;
    const reqId = request.headers['req_id'];
    const timestamp = new Date().toISOString();
    const path = request.url;

    const message = exception.getResponse() as Record<string, string>;

    this.logger.error(
      `${JSON.stringify({
        reqId,
        timestamp,
        path,
        requestBody,
        cause,
        stack,
      })}`,
    );

    response.status(status).json({
      status,
      path,
      timestamp,
      message: cause.name || message.error || null,
      stack: isDev ? stack : null,
    });
  }
}
