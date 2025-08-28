import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as any;

    // 记录错误日志
    this.logger.error(
      `HTTP异常 - 状态: ${status}, 路径: ${request.url}, 消息: ${JSON.stringify(errorResponse)}`
    );

    // 构建统一的错误响应格式
    const responseBody = {
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
      message:
        typeof errorResponse === 'string' ? errorResponse : errorResponse.message || '请求处理失败',
      data: null,
      errors: errorResponse.errors || errorResponse.error || null,
    };

    response.status(status).json(responseBody);
  }
}
