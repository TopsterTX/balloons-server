import { Logger, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const reqBody = req.body;
    const url = req.url;

    this.logger.log(
      JSON.stringify({
        url,
        headers,
        reqBody,
      }),
    );

    next();
  }
}
