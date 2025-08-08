# Monorepo项目

这是一个使用pnpm管理的monorepo项目。

## 项目结构

```
.
├── projects/         # 子项目目录
│   └── ...           # 各个子项目
├── package.json      # 根目录package.json
└── pnpm-workspace.yaml  # pnpm工作空间配置
```

## 开发指南

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

### 常用命令

- 启动所有项目开发服务：`pnpm dev`
- 构建所有项目：`pnpm build`
- 检查代码格式：`pnpm lint`
- 格式化代码：`pnpm format`
- 中文文案格式检查：`pnpm zhlint`
