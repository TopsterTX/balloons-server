import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 } from 'uuid';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const rid = v4();
    const timestamp = new Date().toISOString();
    const path = request.url;

    const message = exception.getResponse() as Record<string, string>;

    // adding logger
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
