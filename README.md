# Next.js Monorepo项目

这是一个使用pnpm管理的monorepo项目，主要基于Next.js框架开发的多语言Web应用程序。

## 项目技术栈

- **前端框架**: Next.js 15, React 19
- **UI组件库**: Ant Design, Chakra UI
- **状态管理**: Zustand
- **网络请求**: Axios
- **国际化**: i18next, next-i18next
- **样式**: SASS, TailwindCSS
- **构建工具**: pnpm workspace
- **开发工具**: TypeScript, ESLint, Prettier, Husky

## 项目结构

```
.
├── packages/                 # 共享包目录
│   ├── global/               # 全局配置和类型定义
│   └── web/                  # 共享Web组件和工具
├── projects/                 # 子项目目录
│   └── app/                  # Next.js应用主项目
│       ├── public/           # 静态资源和本地化文件
│       │   └── locales/      # 多语言翻译文件 (en, zh-CN)
│       └── src/              # 源代码
│           ├── api/          # API接口定义
│           ├── components/   # 可复用组件
│           ├── constant/     # 常量定义
│           ├── pages/        # 页面组件
│           ├── routes/       # 路由配置
│           ├── store/        # 状态管理
│           ├── styles/       # 全局样式
│           ├── types/        # 类型定义
│           └── utils/        # 工具函数
├── package.json              # 根目录package.json
└── pnpm-workspace.yaml       # pnpm工作空间配置
```

## 功能特性

- **认证系统**: 登录功能，带有用户认证和授权
- **多语言支持**: 支持中文和英文，可轻松扩展其他语言
- **响应式设计**: 适配各种屏幕尺寸
- **统一请求处理**: 封装的axios请求工具，支持统一错误处理和拦截器
- **组件化开发**: 可复用的UI组件库

## 开发指南

### 环境要求

- Node.js 16.x 或更高版本
- pnpm 8.x 或更高版本

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

# 只启动app项目
pnpm --filter app dev
```

### 构建项目

```bash
# 构建所有项目
pnpm build

# 只构建app项目
pnpm --filter app build
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
pnpm --filter app start
```

## 目录结构最佳实践

- 将可重用组件放在 `src/components` 目录
- 页面特定组件放在对应页面目录下
- 全局状态管理放在 `src/store` 目录
- API 请求和服务放在 `src/api` 目录
- 工具函数放在 `src/utils` 目录

## 贡献指南

1. Fork 仓库
2. 创建分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request
