import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { getConnectionManager } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局管道 - 用于验证
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤掉未定义的属性
      transform: true, // 自动转换类型
      forbidNonWhitelisted: true, // 禁止未定义的属性
    })
  );

  // 全局过滤器 - 处理异常
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器 - 转换响应
  app.useGlobalInterceptors(new TransformInterceptor());

  // 配置 CORS
  app.enableCors({
    origin: true, // 允许所有来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 配置 API 前缀
  app.setGlobalPrefix('api');

  // 启动服务器
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`应用已启动: http://localhost:${port}`);

  // 获取数据库连接
  try {
    const connectionManager = getConnectionManager();
    if (connectionManager.has('default') && connectionManager.get('default').isConnected) {
      console.log('数据库连接成功！');
    }
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

bootstrap();
