# Elij UI 技术方案

> 状态：Draft  
> 日期：2026-09-02  
> 项目性质：个人开源项目

## 1. 背景与目标

Elij UI 是一套基于 React 和 TypeScript 的可复用 UI 组件库。项目使用 Storybook 展示组件、交互状态和使用文档，并通过公开 npm package 供其他网站项目安装。

项目按三个能力层逐步建设：

1. **UI Library**：提供网站运行时真正使用的组件、样式和类型。
2. **CLI**：降低安装、初始化、添加组件和配置主题的成本。
3. **MCP Server**：让 Codex、Claude 等支持 MCP 的 AI 工具能够搜索、理解并正确使用组件。

第一目标是让组件库本身稳定、易用和可发布。CLI 是第二阶段重点，MCP 属于后续的 AI 增强能力，不作为网站运行时依赖。

## 2. 非目标

现阶段不考虑：

- 公司内部或私有 package registry。
- 同时支持 React 之外的 Vue、Svelte 等框架。
- 建设完整的在线设计工具。
- 在 MCP 中传输或渲染 React 组件。
- 一开始就提供大量业务组件。

## 3. 核心技术决策

### 3.1 组件库本体采用公开 npm package

网站最终通过 npm 安装组件库：

```bash
npm install elij-ui-library
```

使用方式：

```tsx
import 'elij-ui-library/styles.css';
import { Button } from 'elij-ui-library';

export function Example() {
  return <Button variant="primary">Continue</Button>;
}
```

npm package 是唯一运行时交付方式。CLI 和 MCP 只负责提升开发体验，不能替代 package。

### 3.2 Storybook 作为组件文档与开发环境

Storybook 负责：

- 展示组件及其所有状态。
- 提供交互式 Props 控制面板。
- 生成基础 API 文档。
- 执行可访问性检查。
- 为视觉回归测试提供稳定页面。
- 为组件注册表提供示例链接。

Storybook 静态站点后续可以部署到 GitHub Pages、Cloudflare Pages 或 Vercel。个人项目优先推荐 GitHub Pages，成本最低且与代码仓库关联直接。

### 3.3 CLI 优先于 MCP

CLI 对人类开发者、自动化脚本和 AI 编码工具都可用，覆盖面比 MCP 更广，因此优先实现。

预期命令：

```bash
npx elij-cli init
npx elij-cli list
npx elij-cli add button
npx elij-cli add input modal
npx elij-cli theme
npx elij-cli doctor
```

初期 CLI 采用“安装 package”模式，而不是将全部组件源码复制到业务项目。未来如果需要让使用者深度修改组件，可以增加 `--copy` 模式。

### 3.4 MCP 作为 AI 适配层

MCP Server 只向 AI 提供结构化的组件知识和安全的操作入口：

- 查询可用组件。
- 读取组件 Props、示例和使用限制。
- 搜索适合某种页面场景的组件。
- 获取 design tokens。
- 获取安装命令。
- 调用受控的 CLI 操作。

MCP 不直接参与生产网站运行，也不应成为组件安装的唯一入口。

## 4. 总体架构

```text
                         ┌─────────────────────┐
                         │   Storybook Docs    │
                         │ 人类浏览与组件调试  │
                         └──────────┬──────────┘
                                    │
┌─────────────────────┐   ┌─────────▼──────────┐
│      UI CLI         │──▶│ Component Registry │◀──┐
│ init/add/list/theme │   │ 组件元数据与示例    │   │
└──────────┬──────────┘   └─────────┬──────────┘   │
           │                        │              │
           │              ┌─────────▼──────────┐   │
           │              │    MCP Server      │───┘
           │              │ AI 查询与受控操作  │
           │              └────────────────────┘
           │
┌──────────▼──────────────────────────────────────┐
│              elij-ui-library                   │
│ React Components + TypeScript + CSS + Tokens    │
└──────────┬──────────────────────────────────────┘
           │ npm install
┌──────────▼──────────┐
│ Consumer Websites  │
│ Vite / Next.js 等   │
└─────────────────────┘
```

## 5. 建议的仓库结构

项目发展到 CLI 阶段后，建议迁移为 npm workspaces monorepo：

```text
ui-library/
├── apps/
│   └── storybook/                 # 可选：Storybook 独立应用
├── packages/
│   ├── ui/                        # elij-ui-library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── registry/                  # elij-registry
│   │   ├── components.json
│   │   └── schema.json
│   ├── cli/                       # elij-cli
│   │   ├── src/
│   │   └── package.json
│   └── mcp/                       # elij-mcp，后续阶段
│       ├── src/
│       └── package.json
├── docs/
├── package.json
└── README.md
```

当前只有一个组件包，不需要立即迁移 monorepo。开始开发 CLI 时再迁移，可以避免早期结构过度复杂。

## 6. UI Library 设计

### 6.1 技术栈

- React 18 和 React 19：通过 peer dependencies 支持。
- TypeScript：公开完整 Props 类型。
- Vite library mode：生成 ESM、CommonJS 和 CSS。
- Storybook：组件文档、示例和可访问性检查。
- ESLint：静态代码检查。
- Vitest + Testing Library：组件行为测试，后续加入。

### 6.2 组件 API 原则

- 优先复用原生 HTML 属性。
- 使用 `forwardRef` 暴露底层 DOM ref；在正式发布前统一补齐。
- 每个组件必须导出 Props 类型。
- 避免依赖特定业务数据结构。
- 所有交互组件支持键盘操作和清晰的 focus 状态。
- 不将 React 打包进产物，避免业务项目出现多份 React。
- 避免在组件内部写死品牌文案和页面跳转逻辑。

### 6.3 样式与主题

主题采用 `UIProvider`、`data-ui-theme` 和 CSS custom properties。组件只消费语义化 token，不直接判断主题，也不写死具体颜色。

当前内置 `light`、`dark` 和 `ocean` 三套主题：

```css
:root {
  --ui-color-primary: #2563eb;
  --ui-color-text: #172033;
  --ui-radius-sm: 0.5rem;
}

[data-ui-theme="dark"] {
  --ui-color-primary: #60a5fa;
  --ui-color-text: #e5edf8;
}
```

主题可以作用于整个应用，也可以只包裹某个页面区域：

```tsx
<UIProvider theme="dark">
  <App />
</UIProvider>
```

使用者可以传入自定义主题名称，并在自己的 CSS 中定义或覆盖 token：

```css
[data-ui-theme="my-theme"] {
  --ui-color-primary: #7c3aed;
  --ui-radius-sm: 0.75rem;
}
```

主题设计规则：

- token 使用用途命名，例如 `color-primary`，不使用 `blue-500` 作为组件公开 API。
- 所有颜色主题必须检查文本对比度、focus 状态、disabled 状态和错误状态。
- Storybook 顶部工具栏可以全局切换主题，所有组件 stories 都必须在 light 和 dark 下检查。
- `UIProvider` 设置 `color-scheme`，让浏览器原生控件尽量匹配当前主题。
- 主题默认按 Provider 区域隔离，避免修改业务项目的 `document` 或全局状态。

后续可以增加：

- JSON 格式 design tokens。
- CSS token 自动生成。
- CLI theme 配置向导。
- 跟随操作系统的 `system` 主题模式。

### 6.4 多语言设计

多语言同样由 `UIProvider` 管理。当前内置 `en` 和 `zh-CN`，未使用 Provider 时默认 `en`。

当前内置词条覆盖关闭、加载、空状态、分页、菜单、标签页、步骤、进度及常用确认/取消操作。组件在没有显式传入 `ariaLabel` 或同类属性时使用 Provider 的本地化默认值；调用方传入的值始终优先。

```tsx
<UIProvider locale="zh-CN">
  <App />
</UIProvider>
```

组件内部通过 `useUI().t()` 读取 UI 文案：

```tsx
const { t } = useUI();
return <button aria-label={t('close')}>...</button>;
```

业务项目可以追加新的 locale 或覆盖内置词条：

```tsx
<UIProvider
  locale="en-SG"
  messages={{ next: 'Carry on', previous: 'Go back' }}
>
  <App />
</UIProvider>
```

翻译回退顺序为：当前 locale 或自定义 messages → 英文默认词条 → 调用方传入的 fallback → key 本身。设计约束如下：

- 组件的可见文案和无障碍文案不得直接写死在实现中。
- 业务内容由业务项目传入，不放入 UI Library 翻译表。
- 翻译 key 描述语义或动作，例如 `close`、`next`，避免以英文句子作为 key。
- 组件 Props 直接传入的文案优先级高于 Provider 默认翻译。
- 布局必须允许不同语言造成的文本长度变化，不能依赖固定按钮宽度。
- 新增组件时必须在 Storybook 中检查英文和简体中文。
- Storybook 的 locale 工具栏同时切换组件内置文案与演示数据；演示翻译仅用于文档展示，不进入发布包的组件 API，也不替业务项目翻译业务内容。
- 自动化测试必须覆盖至少一组英文默认语义和一组简体中文语义，包含可访问名称查询。
- 未来加入 RTL 语言时，通过 `dir` 和逻辑 CSS 属性支持，不在组件里判断具体语言。

### 6.5 组件完成定义

每个可发布组件至少需要：

- 组件实现文件。
- 样式文件。
- TypeScript Props 类型。
- Storybook stories。
- 默认状态、禁用状态和边界状态示例。
- 组件行为测试。
- 基础可访问性检查。
- Light、Dark 和至少两种语言的 Storybook 检查。
- 使用说明和 import 示例。

### 6.6 当前组件清单

| 类别 | 组件 | 主要能力 |
|---|---|---|
| Actions | Button | 三种视觉层级、三种尺寸、disabled、原生属性和 ref |
| Data Visualization | LineChart、BarChart、AreaChart、PieChart、DonutChart、StackedBarChart、StackedBarLineChart、VerticalBarChart、HorizontalBarChart、GroupedBarChart、DualAxisChart | 响应式、主题色、多序列、堆叠、组合、双轴、Tooltip、Legend、空状态、加载状态和无障碍标签 |
| Forms | Input、Textarea | label、helper、error、disabled、完整原生属性和 ref |
| Forms | Checkbox | checked、indeterminate、disabled 和 ref |
| Forms | RadioGroup | 受控或非受控值、方向、单项 disabled |
| Forms | Switch | 受控或非受控值、键盘操作和 switch ARIA 语义 |
| Forms | Select | 原生选择体验、options、placeholder、helper 和 error |
| Feedback | Alert | 四种语义状态、可关闭操作和本地化关闭标签 |
| Feedback | Spinner | 三种尺寸和本地化加载标签 |
| Data Display | Badge | 五种语义颜色 |
| Data Display | Card | Header、Body、Footer 和 interactive 状态 |
| Overlay | Dialog | Escape、遮罩关闭、焦点约束、焦点恢复和滚动保护 |
| Layout | Divider | 横向、纵向和带标签分隔线 |
| General | Typography | Title、Text、Paragraph、Link 和语义化文字状态 |
| Layout | Space、Flex | 方向、间距、换行和 Flex 对齐能力 |
| Layout | Grid | Row、Col 和 24 栏宽度、offset、gutter |
| Layout | Layout | Header、Sider、Content、Footer 页面骨架 |
| Navigation | Menu、Dropdown | 横向或纵向菜单、键盘导航、选中状态和浮层关闭 |
| Navigation | Tabs | 受控或非受控状态、方向键切换、水平或垂直方向 |
| Navigation | Breadcrumb | 链接层级、当前页面和自定义分隔符 |
| Navigation | Pagination | 页码窗口、上下页和本地化标签 |
| Navigation | Steps | horizontal、vertical、wait、process、finish、error |
| Data Display | Avatar、Tag | 图片回退、文字头像、尺寸、状态和关闭操作 |
| Data Display | Tooltip | hover、focus、Escape 和 ARIA 描述关联 |
| Data Display | Table、Empty | 类型安全 columns、rowKey、空数据和本地化 |
| Feedback | Skeleton、Progress | 降低动画、线形或圆形进度及状态语义 |
| Feedback | Result | success、info、warning、error 结果页面 |
| Overlay | Drawer | 左右位置、遮罩、Escape、焦点循环和恢复 |

## 7. Component Registry

Registry 是 Storybook、CLI 和 MCP 共用的数据源，避免三处分别维护组件资料。

建议格式：

```json
{
  "$schema": "./schema.json",
  "components": [
    {
      "name": "Button",
      "package": "elij-ui-library",
      "category": "actions",
      "description": "触发用户操作的按钮组件",
      "exports": ["Button", "ButtonProps"],
      "styles": ["elij-ui-library/styles.css"],
      "storybookId": "components-button--primary",
      "status": "stable",
      "since": "0.1.0"
    }
  ]
}
```

Registry 需要 JSON Schema 校验，并在持续集成中检查：

- 注册的组件是否真实导出。
- Storybook story 是否存在。
- 组件状态是否合法。
- 文档和版本字段是否完整。

## 8. CLI 技术方案

### 8.1 技术选型

- Node.js 20 或更高版本。
- TypeScript。
- `commander` 或 `cac` 处理命令。
- `prompts` 提供交互式问题。
- `picocolors` 输出简洁的彩色信息。
- 使用 Node.js 原生文件 API 完成配置修改。

尽量保持依赖少，不要求全局安装，默认通过 `npx` 使用。

### 8.2 命令设计

#### `init`

1. 检测当前项目是否为 React 项目。
2. 检测 package manager。
3. 安装 `elij-ui-library`。
4. 提示或自动加入全局 CSS import。
5. 创建可选的主题文件。
6. 输出下一步使用示例。

#### `add <components...>`

初期确认 package 已安装，并输出组件 import 示例。未来支持 `--copy` 时，可以从 registry 下载或复制组件源码。

#### `list`

按类别输出可用组件、稳定性状态和当前版本。

#### `theme`

生成本地 token 覆盖文件，不直接修改组件库源码。

#### `doctor`

检查：

- React 版本兼容性。
- 样式是否正确导入。
- package 是否存在重复版本。
- TypeScript 配置是否满足要求。
- 组件库版本是否过旧。

### 8.3 安全边界

- 修改文件前显示将要执行的操作。
- 默认不覆盖现有文件。
- 提供 `--dry-run`。
- 自动修改配置前创建可恢复备份，或使用可验证的 AST 修改。
- 不执行 registry 中的任意脚本。
- 下载内容必须来自固定的公开 npm package 或项目官方地址。

## 9. MCP Server 技术方案

### 9.1 启动条件

满足以下条件后再开始 MCP：

- 组件 API 已相对稳定。
- Registry 已成为可靠的单一数据源。
- CLI 已覆盖基本安装流程。
- 已有实际 AI 使用场景，证明 MCP 能减少重复工作。

### 9.2 首批 MCP Tools

```text
list_components(category?, status?)
search_components(query)
get_component(name)
get_component_example(name, example?)
get_design_tokens(theme?)
get_install_instructions(framework, packageManager?)
```

需要修改用户项目的工具应后置，例如：

```text
install_library(projectPath, packageManager?)
add_component(projectPath, componentName)
apply_theme(projectPath, theme)
```

写操作必须：

- 明确目标项目路径。
- 默认先返回预览或 dry-run。
- 限制可修改文件范围。
- 复用 CLI 实现，避免 MCP 内重新实现一套安装逻辑。
- 返回具体修改结果和错误信息。

### 9.3 MCP Resources

除了 tools，可以提供只读 resources：

- `ui://registry/components`
- `ui://components/{name}`
- `ui://tokens/default`
- `ui://guides/getting-started`

AI 可以先读取资源，再决定是否调用工具。

## 10. 发布与版本管理

### 10.1 npm 发布

正式公开发布前需要：

1. 确认 `elij-ui-library` npm package 名称可用。
2. 将 package 名称调整为实际可发布的名称。
3. 从 UI package 移除 `private: true`。
4. 补充 `license`、`repository`、`homepage`、`keywords` 和作者信息。
5. 确认 `npm pack --dry-run` 只包含必要文件。
6. 使用 `npm publish --access public` 发布 scoped package。

项目默认采用无 scope 的 `elij-ui-library`；如果名称不可用，需要在首次发布前选择另一个全局唯一名称并同步更新文档。

### 10.2 语义化版本

遵循 Semantic Versioning：

- Patch：修复 bug，不改变公开 API。
- Minor：新增向后兼容的组件或 Props。
- Major：删除或修改已有公开 API。

建议使用 Changesets 管理 changelog 和多个 package 的版本发布。CLI 与 MCP 开始开发后尤其适合引入。

### 10.3 自动发布

后续使用 GitHub Actions：

1. 安装依赖。
2. 执行 lint、typecheck 和 tests。
3. 构建 UI package。
4. 构建 Storybook。
5. 检查 package 内容。
6. 合并版本 PR 后发布 npm。
7. 部署 Storybook 到 GitHub Pages。

npm token 应存放在 GitHub Actions Secrets 中，不写入仓库。

## 11. 测试策略

### 11.1 每次提交

- TypeScript 类型检查。
- ESLint。
- Vitest 单元和交互测试。
- Registry schema 校验。
- UI package 构建。

### 11.2 Pull Request

- Storybook 静态构建。
- Storybook test-runner 或 browser tests。
- 可访问性检测。
- 关键组件视觉回归测试。
- 在最小 Vite React 示例项目中执行安装测试。

### 11.3 发布前

- 执行 `npm pack`。
- 将 tarball 安装进临时 React 项目。
- 验证 ESM、CommonJS、类型声明和 CSS exports。
- 验证 React 没有被重复打包。

## 12. 实施阶段

### Phase 1：组件库基础完善

目标：组件包可以稳定地被其他 React 项目安装。

- [x] React + TypeScript 基础结构。
- [x] Vite library build。
- [x] Storybook。
- [x] Button 示例组件。
- [x] CSS design tokens 基础。
- [x] `UIProvider` 语言和主题上下文。
- [x] English 与简体中文基础词条。
- [x] Light、Dark 与 Ocean 主题。
- [x] Storybook 全局语言和主题切换。
- [x] 为原生表单组件和 Button 补充 `forwardRef`。
- [x] 加入 Vitest 和 Testing Library。
- [ ] 创建 Vite consumer 示例项目执行真实安装测试。
- [x] 增加 Input、Textarea、Select、Checkbox、RadioGroup、Switch、Alert、Badge、Card、Spinner、Dialog 和 Divider。
- [x] 参考 Ant Design 分类增加 Typography、Space、Flex、Grid、Layout、Avatar、Tag、Tooltip、Tabs、Menu、Dropdown、Breadcrumb、Pagination、Steps、Table、Empty、Skeleton、Progress、Result 和 Drawer。
- [ ] 完善 README、License 和贡献规范。

验收标准：公开 API 有类型声明，构建和测试通过，生成的 tarball 可在独立 React 项目运行。

### Phase 2：公开 npm 与在线 Storybook

- [ ] 确认公开 npm package 名称。
- [ ] 建立 GitHub repository。
- [ ] 配置 Changesets。
- [ ] 配置 GitHub Actions。
- [ ] 发布第一个公开版本。
- [ ] 部署 Storybook。

验收标准：外部项目可以通过 npm package 名称安装，文档存在公开访问地址。

### Phase 3：Component Registry

- [ ] 定义 registry JSON Schema。
- [ ] 为所有组件生成元数据。
- [ ] 增加 registry 校验脚本。
- [ ] 将 registry 一同发布为 package 或静态 JSON。

验收标准：CLI 或其他工具无需扫描源码即可获得准确的组件信息。

### Phase 4：CLI

- [ ] 迁移到 npm workspaces。
- [ ] 建立 `elij-cli`。
- [ ] 实现 `init`、`list` 和 `doctor`。
- [ ] 实现 `add` 和 `theme`。
- [ ] 支持 npm、pnpm 和 yarn。
- [ ] 提供 dry-run 和错误恢复。

验收标准：在一个全新的 Vite React 项目中，一条 `init` 命令即可完成安装和基础配置。

### Phase 5：MCP

- [ ] 建立只读 MCP Server。
- [ ] 实现组件搜索、详情、示例和 tokens tools。
- [ ] 在 Codex 等至少一个客户端完成测试。
- [ ] 根据实际需求增加调用 CLI 的写操作。
- [ ] 编写权限、安全和故障处理文档。

验收标准：AI 能选择正确组件并生成可通过类型检查的示例代码；所有写操作均可预览、可限制范围、可追踪结果。

## 13. 主要风险与处理

| 风险 | 影响 | 处理方式 |
|---|---|---|
| 组件 API 过早变化 | 使用项目频繁升级 | MCP 和 CLI 后置，先稳定基础组件 |
| 同时维护多套元数据 | 文档和工具结果不一致 | 建立统一 Component Registry |
| CLI 自动修改错误文件 | 破坏使用者项目 | dry-run、路径校验、非覆盖式修改 |
| CSS 与业务项目冲突 | 样式异常 | 使用 `ui-` 前缀和 CSS tokens |
| 翻译遗漏或文本溢出 | 部分语言界面不可用 | 统一词条、locale 回退和 Storybook 多语言检查 |
| 自定义主题缺少 token | 组件局部颜色不一致 | 语义化 token 契约、默认值和主题检查清单 |
| React 被重复打包 | Hooks 报错、包体积增加 | React 保持 peer dependency 和 external |
| npm 名称不可用 | 无法按预期发布 | 发布前查询名称，准备无 scope 备用名 |
| MCP 维护成本高于收益 | 项目复杂但使用量低 | 等 CLI 和 registry 稳定、有真实需求后再开发 |

## 14. 当前建议的下一步

下一轮开发优先完成 Phase 1，而不是立即实现 CLI 或 MCP：

1. 为现有 Button 增加 ref 支持和测试。
2. 建立一个独立 consumer 示例，验证真实安装。
3. 补充 Input、Checkbox 和 Modal，形成最小可用组件集。
4. 确认项目名称、License 和公开 GitHub 仓库。
5. 发布 `0.1.0` 后再开始 Component Registry 与 CLI。

这条路线能够先验证组件库是否真的好用，再逐步增加自动化和 AI 能力，避免早期投入过多工具层建设。
