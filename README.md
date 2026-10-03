# 832401218 Calculator Frontend

前后端分离计算器系统的**前端**部分，原生 HTML + CSS + JavaScript 实现，
不依赖任何框架与构建工具。

前端只负责界面展示与用户交互：收集表达式、调用后端 API、
展示后端返回的结果与错误信息、展示和管理计算历史。
**所有计算均在后端完成**，前端不包含任何计算逻辑。

## 技术栈

| 组件 | 技术 |
| --- | --- |
| 结构 | HTML5 |
| 样式 | CSS3（Flex + Grid，响应式布局） |
| 逻辑 | 原生 JavaScript（ES6，无框架、无构建步骤） |
| 通信 | Fetch API（JSON over HTTP） |

## 运行环境

- 任意现代浏览器（Chrome / Edge / Firefox）
- 本地预览需要一个静态文件服务器（如 Python 内置的 `http.server`）

## 启动方式

```bash
# 在 src 目录下启动静态服务器
cd src
python -m http.server 5500
```

浏览器访问 `http://localhost:5500/index.html`。

## 配置说明

后端 API 地址在 `src/script.js` 顶部配置：

```js
const API_BASE = "http://localhost:5000/api";
```

- 本地开发：保持默认值（后端默认运行在 5000 端口）。
- 部署后：改为后端服务的公网地址，例如
  `https://your-backend.onrender.com/api`。

## 前后端连接方式

1. 先启动后端服务（见后端仓库 README）。
2. 将 `API_BASE` 指向后端 `/api` 前缀的地址。
3. 前端通过以下接口与后端交互：

| 前端行为 | 调用接口 |
| --- | --- |
| 点击 `=` | `POST /api/calculate`，请求体 `{ "expression": "..." }` |
| 页面加载 / 点击"刷新" | `GET /api/history` |
| 点击历史记录上的 `×` | `DELETE /api/history/{id}` |
| 点击"清空" | `DELETE /api/history` |

后端不可用时，界面仍可正常输入，但无法得到新的计算结果，
历史列表会显示"无法连接后端"。

## 项目结构

```
832401218_calculator_frontend/
├── src/
│   ├── index.html     # 页面结构（计算器键盘 + 历史面板）
│   ├── style.css      # 样式
│   └── script.js      # 交互逻辑与 API 调用
├── README.md
└── codestyle.md
```
