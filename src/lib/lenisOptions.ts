import type { LenisOptions } from "lenis";

/** 全站统一滚动阻尼参数：主页与详情页共用，保证手感一致 */
export const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.08,
  wheelMultiplier: 0.78,
  infinite: false,
  gestureOrientation: "vertical",
  /** 全站 root Lenis 直接启用内置 raf，避免未挂外部 ticker 时滚动失效 */
  autoRaf: true,
};
