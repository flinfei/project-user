import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        // 检查是否已经是统一响应格式
        if (data && data.code !== undefined && data.success !== undefined) {
          return data;
        }

        // 转换为统一响应格式
        return {
          code: 200,
          data,
          message: '操作成功',
          success: true,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      })
    );
  }
}
