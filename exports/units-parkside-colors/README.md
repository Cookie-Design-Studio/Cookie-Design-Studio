# Units Parkside 配色导出

从 [Units Parkside](https://units.gr/en/unit/units-parkside/) 提取的完整品牌配色。

## 文件说明

| 文件 | 用途 |
|------|------|
| `Units-Parkside-Colors.fig` | **Figma 设计文件**（直接双击或用 Figma Desktop 打开） |
| `units-parkside-tokens.json` | Design Tokens（可用 Tokens Studio 插件导入） |
| `units-parkside-colors.css` | CSS 变量 |
| `generate-fig.mjs` | 重新生成上述文件的脚本 |

## 在 Figma 中打开

1. 下载 `Units-Parkside-Colors.fig`
2. 使用 **Figma Desktop** 双击打开，或
3. Figma 网页端 → **Import file** → 选择该 `.fig` 文件

文件内包含分组色板：基础色、暖色、绿色、紫色、红/蓝，以及页面切换动画三色。

## 重新生成

```bash
cd exports/units-parkside-colors
npm install
node generate-fig.mjs
```
