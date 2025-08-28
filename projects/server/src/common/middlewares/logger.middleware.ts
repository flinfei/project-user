import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      // 记录请求日志
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength ? contentLength + 'b' : '-'} ${responseTime}ms - ${ip} - ${userAgent}`
      );
    });

    next();
  }
}
