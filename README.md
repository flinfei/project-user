# Next.js + Nest.js Monorepo全栈项目

这是一个使用pnpm管理的monorepo全栈项目，集成了Next.js前端框架和Nest.js后端框架。这是一个前后端分离的架构，但在同一仓库中管理，便于开发和部署。

## 项目技术栈

### 前端技术栈 (projects/app)

- **前端框架**: Next.js 15, React 19
- **UI组件库**: Ant Design 5.x, Chakra UI 3.x
- **状态管理**: Zustand 5.x
- **网络请求**: Axios
- **国际化**: i18next, next-i18next
- **样式**: SASS, TailwindCSS 4.x
- **数据可视化**: ECharts 6.x
- **动效**: Framer Motion

### 后端技术栈 (projects/server)

- **后端框架**: Nest.js 10.x
- **数据库ORM**: TypeORM
- **数据库**: MySQL
- **身份认证**: Passport.js, JWT
- **配置管理**: @nestjs/config
- **校验**: class-validator, class-transformer

### 共享工具和配置

- **构建工具**: pnpm workspace
- **开发工具**: TypeScript, ESLint, Prettier, Husky
- **中文文案格式化**: zhlint

## 项目结构

```
.
├── packages/                 # 共享包目录
│   ├── global/               # 全局配置和类型定义
│   └── web/                  # 共享Web组件和工具
├── projects/                 # 子项目目录
│   ├── app/                  # Next.js前端应用
│   │   ├── public/           # 静态资源和本地化文件
│   │   │   └── locales/      # 多语言翻译文件 (en, zh-CN)
│   │   └── src/              # 源代码
│   │       ├── api/          # API接口定义
│   │       ├── components/   # 可复用组件
│   │       ├── constant/     # 常量定义
│   │       ├── pages/        # 页面组件
│   │       ├── routes/       # 路由配置
│   │       ├── store/        # 状态管理
│   │       ├── styles/       # 全局样式
│   │       ├── types/        # 类型定义
│   │       └── utils/        # 工具函数
│   └── server/               # Nest.js后端应用
│       ├── src/              # 源代码
│       │   ├── auth/         # 认证模块
│       │   ├── common/       # 公共功能 (过滤器、拦截器、中间件)
│       │   ├── config/       # 配置模块
│       │   ├── user/         # 用户模块
│       │   └── main.ts       # 应用入口
├── package.json              # 根目录package.json
└── pnpm-workspace.yaml       # pnpm工作空间配置
```

## 前后端交互架构

本项目虽然在同一个仓库中管理前端和后端代码，但实际是前后端分离的架构：

- **前端(Next.js)**: 负责用户界面渲染、客户端状态管理、路由导航和用户交互
- **后端(Nest.js)**: 提供RESTful API，处理业务逻辑、数据库操作、身份认证和授权

前后端通过HTTP API进行通信：

- 前端封装了基于axios的request工具，统一处理请求/响应拦截、错误处理和认证token
- 后端实现了统一的响应格式、异常过滤器和数据转换拦截器
- JWT认证流程确保API安全性

## API接口规范

接口定义遵循以下规范:

- 统一的URL前缀: `/api`
- 标准RESTful风格设计
- 统一的响应格式

```typescript
// 响应数据格式
{
  code: number; // 状态码，200表示成功
  message: string; // 响应消息
  data: any; // 响应数据
  success: boolean; // 是否成功
}
```

## 功能特性

- **认证系统**:
  - 基于JWT的用户认证
  - 基于角色的权限控制(RBAC)
  - 登录/注册功能
- **多语言支持**:
  - 支持中文和英文，可轻松扩展其他语言
  - 语言切换组件
  - 基于cookie的语言持久化
- **响应式设计**: 适配各种屏幕尺寸
- **统一请求处理**: 封装的axios请求工具，支持统一错误处理和拦截器
- **组件化开发**: 可复用的UI组件库

## 开发指南

### 环境要求

- Node.js 16.x 或更高版本
- pnpm 8.x 或更高版本
- MySQL 8.x (后端数据库)

### 安装依赖

```bash
pnpm install
```

### 添加依赖

根目录添加开发依赖：

```bash
pnpm add -D <package> -w
```

为特定项目添加依赖：

```bash
pnpm add <package> --filter <project-name>
```

### 本地开发

启动开发服务器：

```bash
# 启动所有项目
pnpm dev

# 只启动前端应用
pnpm --filter app dev

# 只启动后端应用
pnpm --filter server start:dev
```

### 构建项目

```bash
# 构建所有项目
pnpm build

# 只构建前端应用
pnpm --filter app build

# 只构建后端应用
pnpm --filter server build
```

### 代码规范

检查代码格式：

```bash
pnpm lint
```

格式化代码：

```bash
pnpm format
```

中文文案格式检查：

```bash
pnpm zhlint
```

## 部署

部署前先构建项目：

```bash
pnpm build
```

然后可以使用以下命令启动生产服务器：

```bash
# 启动前端服务
pnpm --filter app start

# 启动后端服务
pnpm --filter server start:prod
```

## 目录结构最佳实践

- 将可重用组件放在 `src/components` 目录
- 页面特定组件放在对应页面目录下
- 全局状态管理放在 `src/store` 目录
- API 请求和服务放在 `src/api` 目录
- 工具函数放在 `src/utils` 目录
- 后端业务模块采用Nest.js模块化结构，每个功能模块包含controllers、services、entities等

## 贡献指南

1. Fork 仓库
2. 创建分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request
