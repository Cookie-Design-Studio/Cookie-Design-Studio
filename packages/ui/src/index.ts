/**
 * @cookie-design-studio/ui
 *
 * 约定：
 * - 可复用的展示组件、hooks、设计 token（CSS）放在本包；应用层页面与路由留在 `src/`。
 * - 新增组件：在 `packages/ui/src/` 实现并在此文件导出；样式放 `packages/ui/styles/` 并在入口 CSS 之前引入。
 * - 依赖 GSAP 的组件要求宿主已安装 `gsap`；SplitText 动画需 GSAP 会员插件 `SplitText`。
 */
export { SiteHeader } from "./components/SiteHeader";
export type { SiteHeaderProps } from "./components/SiteHeader";
export { SplitText } from "./components/SplitText";
export type { SplitTextProps } from "./components/SplitText";
export { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
