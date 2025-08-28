# Cursor AI 规则配置

本目录包含了Cursor AI助手的规则配置文件，用于规范项目开发流程和代码质量。

## 规则文件结构

- `rules/` - 规则文件目录
  - `global.mdc` - 全局通用规范
  - `api.mdc` - API开发规范
  - `component.mdc` - 前端组件开发规范
  - `code-review.mdc` - 代码审查规范
  - `index.mdc` - 规则索引文件

## 规则结构

本项目在`.cursor/rules`目录下配置了一系列规则，用于规范代码风格、Git提交信息等。

1. 生成的提交信息格式如下：

```
<类型>(<范围>): <简短描述>

[可选的详细描述]

[可选的关闭Issue引用]
```

## 如何添加新规则

1. 在`.cursor/rules`目录下创建新的`.mdc`文件
2. 文件开头添加YAML前置元数据：

```
---
description: 规则描述
globs: ["匹配的文件模式"]
alwaysApply: true或false
---
```

3. 编写规则内容
4. 在`.cursor/rules/index.mdc`中添加新规则的引用

## 规则优先级

1. 全局规则（`alwaysApply: true`）会应用于所有文件
2. 特定规则会根据文件类型自动应用
3. 手动引用的规则（使用@规则名称）优先级最高

## 如何更新规则

如需更新规则，请修改对应的规则文件。规则文件采用Markdown格式，顶部包含YAML元数据，用于定义规则的适用范围和触发条件。
