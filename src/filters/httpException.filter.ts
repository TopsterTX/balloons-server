import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { v4 } from 'uuid';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const requestBody = request.body;
    const rid = v4();
    const timestamp = new Date().toISOString();
    const path = request.url;

    const message = exception.getResponse() as Record<string, string>;

    this.logger.log(
      'info',
      `${JSON.stringify({ rid, timestamp, path, requestBody })}`,
    );

    response
      .status(status)
      .header('rid', rid)
      .json({
        status,
        path,
        timestamp,
        message: message.error || null,
      });
  }
}
