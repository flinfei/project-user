import { Module, MiddlewareConsumer, NestModule, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.local'],
    }),

    // MySQL数据库模块
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql' as const,
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [User],
        synchronize: true, // 启用同步，自动创建表结构
        logging: configService.get<boolean>('database.logging'),
        autoLoadEntities: true,
      }),
    }),

    // 用户和认证模块
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATABASE_CONNECTION_LOGGER',
      useFactory: () => {
        const logger = new Logger('DatabaseConnection');
        logger.log('数据库连接成功！');
        return logger;
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 应用日志中间件到所有路由
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
