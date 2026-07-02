import type { BlogPost, BlogMeta } from '../types';

export const blogMeta: BlogMeta = {
  title: 'My Tech Blog',
  description: '记录技术学习与思考',
  author: 'ByteKt',
  avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=BK&backgroundColor=6366f1',
};

export const blogPosts: BlogPost[] = [
  {
    id: 'building-modern-web-apps',
    title: '构建现代 Web 应用的最佳实践',
    summary: '探讨 2026 年构建现代 Web 应用的技术选型、架构设计和性能优化策略，涵盖前端框架、状态管理、路由设计等方面。',
    content: `
## 引言

Web 开发领域在过去几年发生了翻天覆地的变化。从早期的 jQuery 时代，到如今 React、Vue、Svelte 等现代框架百花齐放，前端工程的复杂度持续攀升。

## 技术选型

### 前端框架

| 框架 | 优势 | 适用场景 |
|------|------|----------|
| React | 生态丰富、社区活跃 | 中大型应用 |
| Vue | 上手简单、文档友好 | 中小型项目 |
| Svelte | 编译时优化、体积小 | 性能敏感场景 |

### 构建工具

\`\`\`bash
# Vite 已成为主流选择
npm create vite@latest my-app -- --template react-ts
\`\`\`

## 架构设计

一个好的前端架构应该遵循以下原则：

1. **组件化设计** — 将 UI 拆分为可复用的组件
2. **关注点分离** — 业务逻辑与 UI 渲染分离
3. **状态管理** — 合理划分服务端状态与客户端状态

### 推荐的目录结构

\`\`\`
src/
├── components/    # 通用组件
├── features/      # 功能模块
├── hooks/         # 自定义 Hooks
├── lib/           # 工具函数
├── pages/         # 页面组件
└── types/         # 类型定义
\`\`\`

## 性能优化

> 性能优化不是一次性工作，而是贯穿整个开发周期的持续实践。

关键优化策略：

- **代码分割**：使用 \`React.lazy\` 和 \`Suspense\` 进行路由级别的代码分割
- **图片优化**：使用 WebP 格式，配合懒加载
- **缓存策略**：合理设置 HTTP 缓存头，使用 Service Worker

\`\`\`typescript
// 代码分割示例
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BlogPost />
    </Suspense>
  );
}
\`\`\`

## 总结

构建现代 Web 应用需要综合考虑技术选型、架构设计和性能优化。没有银弹式的解决方案，关键是根据项目实际需求做出合理的选择。
    `,
    tags: ['前端', '架构', '性能优化'],
    date: '2026-06-28',
    readingTime: 8,
    coverEmoji: '🚀',
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'TypeScript 高级模式实战',
    summary: '深入探索 TypeScript 的高级类型系统，包括条件类型、模板字面量类型、映射类型等实用技巧。',
    content: `
## 为什么需要高级类型

TypeScript 的类型系统非常强大，掌握高级类型模式可以大幅提升代码的类型安全性和可维护性。

## 条件类型

条件类型允许你根据类型关系创建新类型：

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>;  // true
type B = IsString<42>;        // false
\`\`\`

### 分布式条件类型

当条件类型作用于泛型联合类型时，会自动分布：

\`\`\`typescript
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]
\`\`\`

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型非常强大：

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>;  // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
\`\`\`

## 映射类型

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

// 实际应用：API 响应类型
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Optional<User>;
type ReadonlyUser = Readonly<User>;
\`\`\`

## infer 关键字

\`infer\` 让你在条件类型中推断类型：

\`\`\`typescript
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;

function greet(name: string): string {
  return \`Hello, \${name}\`;
}

type GreetReturn = ReturnType<typeof greet>;  // string
type GreetParams = Parameters<typeof greet>;  // [name: string]
\`\`\`

## 实战：类型安全的 Event Emitter

\`\`\`typescript
type EventMap = {
  click: { x: number; y: number };
  focus: { target: string };
  change: { value: string };
};

class TypedEmitter<T extends Record<string, unknown>> {
  private handlers = new Map<keyof T, Set<Function>>();

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.handlers.get(event)?.forEach(handler => handler(data));
  }
}

const emitter = new TypedEmitter<EventMap>();
emitter.on('click', ({ x, y }) => console.log(x, y));
// 完全类型安全！
\`\`\`

## 总结

掌握 TypeScript 高级类型模式，能让你的代码更加健壮、自文档化。关键是循序渐进地学习，在实际项目中逐步应用这些模式。
    `,
    tags: ['TypeScript', '前端'],
    date: '2026-06-25',
    readingTime: 10,
    coverEmoji: '💡',
  },
  {
    id: 'rust-for-web-developers',
    title: 'Rust 入门：从 Web 开发者的视角',
    summary: '以 Web 开发者的视角探索 Rust 编程语言，理解所有权系统、借用检查和为什么 Rust 值得学习。',
    content: `
## 为什么 Web 开发者应该学 Rust

Rust 连续多年被评为最受开发者喜爱的语言。对于 Web 开发者来说，学习 Rust 有诸多好处：

- **性能极致**：接近 C/C++ 的性能，无需垃圾回收
- **内存安全**：编译时保证内存安全，杜绝空指针和悬垂指针
- **工具链现代**：Cargo 是顶级的包管理器
- **WASM 支持**：可直接编译到 WebAssembly

## 所有权系统

Rust 最核心的概念是所有权（Ownership）：

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // s1 的所有权转移给 s2
    
    // println!("{}", s1);  // 编译错误！s1 已失效
    println!("{}", s2);     // 正确
}
\`\`\`

### 借用与引用

\`\`\`rust
fn main() {
    let s = String::from("hello");
    
    print_string(&s);  // 不可变借用
    println!("{}", s); // s 仍然有效
    
    let mut s2 = String::from("world");
    modify_string(&mut s2); // 可变借用
}

fn print_string(s: &String) {
    println!("{}", s);
}

fn modify_string(s: &mut String) {
    s.push_str("!!!");
}
\`\`\`

## 模式匹配

Rust 的 \`match\` 表达式非常强大：

\`\`\`rust
enum WebEvent {
    PageLoad,
    Click { x: i32, y: i32 },
    KeyPress(char),
}

fn handle_event(event: WebEvent) {
    match event {
        WebEvent::PageLoad => println!("页面已加载"),
        WebEvent::Click { x, y } => println!("点击位置: ({}, {})", x, y),
        WebEvent::KeyPress(c) => println!("按键: {}", c),
    }
}
\`\`\`

## 错误处理

Rust 使用 \`Result\` 和 \`Option\` 替代异常：

\`\`\`rust
use std::fs::File;
use std::io::Read;

fn read_file(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}
\`\`\`

## 总结

Rust 学习曲线陡峭，但一旦掌握了所有权和借用系统，你将获得前所未有的编程信心。对于追求性能和可靠性的 Web 项目，Rust + WASM 是极具潜力的技术栈。
    `,
    tags: ['Rust', '后端', '系统编程'],
    date: '2026-06-20',
    readingTime: 12,
    coverEmoji: '🦀',
  },
  {
    id: 'design-patterns-in-react',
    title: 'React 设计模式精讲',
    summary: '从实际项目出发，详解 React 中最常用的设计模式，包括组合模式、Render Props、HOC、自定义 Hook 等。',
    content: `
## 前言

React 的灵活性使得同样的功能可以用多种方式实现。掌握设计模式能帮助你写出更优雅、可维护的代码。

## 组合模式（Compound Components）

组合模式让多个组件协同工作，共享隐式状态：

\`\`\`tsx
import { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      className={\`tab \${ctx.activeTab === id ? 'active' : ''}\`}
      onClick={() => ctx.setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return ctx.activeTab === id ? <div>{children}</div> : null;
}

// 使用
<Tabs defaultTab="tab1">
  <TabList>
    <Tab id="tab1">标签一</Tab>
    <Tab id="tab2">标签二</Tab>
  </TabList>
  <TabPanel id="tab1">内容一</TabPanel>
  <TabPanel id="tab2">内容二</TabPanel>
</Tabs>
\`\`\`

## 自定义 Hook 模式

将可复用的逻辑封装到自定义 Hook 中：

\`\`\`tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
\`\`\`

## Render Props 模式

\`\`\`tsx
interface MousePosition {
  x: number;
  y: number;
}

function MouseTracker({ render }: { render: (pos: MousePosition) => React.ReactNode }) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return <>{render(position)}</>;
}

// 使用
<MouseTracker render={({ x, y }) => (
  <p>鼠标位置: ({x}, {y})</p>
)} />
\`\`\`

## 总结

设计模式是解决常见问题的模板。关键在于理解每种模式的适用场景和权衡，而不是模式本身的形式。
    `,
    tags: ['React', '设计模式', '前端'],
    date: '2026-06-15',
    readingTime: 9,
    coverEmoji: '🎨',
  },
  {
    id: 'docker-for-frontend',
    title: '前端工程师的 Docker 实战指南',
    summary: '从前端视角学习 Docker，掌握容器化部署前端应用的全流程，包括多阶段构建、Nginx 配置和 CI/CD 集成。',
    content: `
## 为什么前端需要 Docker

很多前端工程师觉得 Docker 是运维的事，但实际上 Docker 能解决前端开发中的诸多痛点：

- **环境一致性**：彻底消除"在我机器上能跑"的问题
- **快速部署**：一条命令即可在任何服务器启动应用
- **微前端支持**：轻松编排多个前端微应用

## 基础 Dockerfile

### 开发环境

\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
\`\`\`

### 生产环境（多阶段构建）

\`\`\`dockerfile
# 阶段一：构建
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 阶段二：运行
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

## Nginx 配置

\`\`\`nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
\`\`\`

## Docker Compose

\`\`\`yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - API_URL=https://api.example.com
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - frontend
\`\`\`

## CI/CD 集成

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and Push
        run: |
          docker build -t my-app .
          docker push registry.example.com/my-app
\`\`\`

## 总结

Docker 在前端开发中不是必需品，但一旦上手，你会发现它在部署和团队协作方面的巨大价值。
    `,
    tags: ['Docker', 'DevOps', '部署'],
    date: '2026-06-10',
    readingTime: 7,
    coverEmoji: '🐳',
  },
  {
    id: 'css-modern-layout',
    title: '现代 CSS 布局完全指南',
    summary: '深入掌握 CSS Grid、Flexbox、Container Queries 等现代布局技术，告别传统浮动布局的痛苦。',
    content: `
## 布局的演进

从 \`float\` 到 \`flexbox\` 再到 \`grid\`，CSS 布局能力在过去十年发生了质的飞跃。

## Flexbox 布局

Flexbox 是一维布局的最佳选择：

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
\`\`\`

### 常用 Flex 属性速查

| 属性 | 作用 | 常用值 |
|------|------|--------|
| \`justify-content\` | 主轴对齐 | center, space-between |
| \`align-items\` | 交叉轴对齐 | center, stretch |
| \`flex-direction\` | 主轴方向 | row, column |
| \`gap\` | 间距 | 1rem, 16px |
| \`flex-wrap\` | 换行 | wrap, nowrap |

## CSS Grid 布局

Grid 是二维布局的利器：

\`\`\`css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.hero-content {
  grid-column: 1;
  grid-row: 2;
}

.hero-image {
  grid-column: 2;
  grid-row: 1 / -1;
}
\`\`\`

## Container Queries

容器查询让组件能根据父容器大小而非视口大小来调整样式：

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
\`\`\`

## 实战：响应式博客布局

\`\`\`css
.page-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr) 250px;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 1024px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
  
  .sidebar-left,
  .sidebar-right {
    display: none;
  }
}
\`\`\`

## 总结

现代 CSS 布局技术已经足够强大，在大多数场景下你不再需要第三方 CSS 框架。掌握 Flexbox 和 Grid，就能轻松应对各种布局需求。
    `,
    tags: ['CSS', '前端', '布局'],
    date: '2026-06-05',
    readingTime: 6,
    coverEmoji: '🎯',
  },
];

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}
