# 代码规范（Frontend）

本项目遵循 **Airbnb JavaScript Style Guide**
（来源：https://github.com/airbnb/javascript），
HTML/CSS 部分参考 **Google HTML/CSS Style Guide**
（来源：https://google.github.io/styleguide/htmlcssguide.html），
并结合项目实际做如下落地约定。

## 1. JavaScript

- 每个脚本文件以 `"use strict";` 开头。
- 使用 `const` / `let`，禁止 `var`；使用模板字符串或字符串拼接时保持一致。
- 语句以分号结尾；缩进 2 个空格。
- 函数使用具名函数声明或箭头函数，回调保持一致风格（本项目使用
  `function` 表达式，兼容性与可读性优先）。
- 禁止使用 `eval`、`new Function` 或任何等价方式执行动态字符串。
- 变量与函数采用小驼峰（camelCase）；常量采用全大写下划线（UPPER_SNAKE_CASE），
  如 `API_BASE`。
- DOM 查询结果缓存到具名变量（如 `expressionEl`），`El` 后缀表示元素。
- 异步请求统一走 `requestJson` 封装，错误以 `Error` 抛出并由调用方捕获展示。

## 2. HTML

- 使用 HTML5 语义化标签（`main`、`section`、`header`）。
- 所有按钮必须写明 `type="button"`；交互控件尽量带 `aria-label` 或
  可访问名称。
- 外链资源写明 `lang`、`charset`、`viewport`。

## 3. CSS

- 类名采用全小写、连字符分隔（kebab-case），如 `.history-list`。
- 选择器权重保持扁平，优先类选择器，避免深层嵌套与 `!important`。
- 颜色等可复用值集中在各组件段落开头，便于统一调整。

## 4. 通用

- 文件使用 UTF-8 编码，换行使用 LF。
- 注释解释“为什么”，而非复述代码。
