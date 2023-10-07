import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction } from 'express';

@Injectable()
export class ReqIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.headers['req_id'] = uuidv4();

    next();
  }
}
