# NestJS 后端服务

这是一个使用 NestJS 框架开发的后端 API 服务，提供用户管理和身份验证功能。

## 功能特性

- 用户管理 (CRUD)
- 基于 JWT 的身份验证
- 基于角色的访问控制
- MySQL 数据库集成
- Swagger API 文档
- 请求日志记录
- 统一响应格式
- 全局异常处理

## 技术栈

- NestJS 10.x
- TypeORM
- MySQL
- Passport.js (JWT & Local)
- Class Validator
- Swagger

## 环境要求

- Node.js 18+
- MySQL 5.7+

## 快速开始

### 1. 环境配置

在项目根目录创建 `.env` 文件：

```env
# 应用配置
PORT=3001
NODE_ENV=development

# JWT配置
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password_here
DB_DATABASE=nestjs_db
DB_SYNCHRONIZE=true
DB_LOGGING=true
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 运行应用

开发环境：

```bash
pnpm start:dev
```

生产环境：

```bash
pnpm build
pnpm start:prod
```

## API 文档

启动应用后，访问 Swagger API 文档：

```
http://localhost:3001/docs
```

## 项目结构

```
src/
├── auth/                  # 认证模块
│   ├── decorators/        # 自定义装饰器
│   ├── dto/               # 数据传输对象
│   ├── guards/            # 守卫
│   └── strategies/        # 认证策略
├── common/                # 公共功能
│   ├── filters/           # 异常过滤器
│   ├── interceptors/      # 拦截器
│   └── middlewares/       # 中间件
├── config/                # 配置
├── user/                  # 用户模块
│   ├── dto/               # 数据传输对象
│   └── entities/          # 实体
├── app.controller.ts      # 应用控制器
├── app.module.ts          # 应用模块
├── app.service.ts         # 应用服务
└── main.ts                # 入口文件
```
