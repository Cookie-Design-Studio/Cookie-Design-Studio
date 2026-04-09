import { useEffect, type RefObject } from "react";

import { gsap, ScrollTrigger } from "../lib/gsapSetup";

/** 相对图片高度的位移百分比，越大越明显 */
const PARALLAX_Y_PERCENT = 6;
/** 案例卡底图统一放大系数（与 CSS 一致）；略大于 1 可减少视差位移时露边 */
const PARALLAX_COVER_SCALE = 1.25;
/**
 * 与 Lenis 同用时用 true：scrub 与滚动 1:1，方向稳定。
 * 向下滚动 → scroll 增大 → progress 增大 → y 从 +% 到 −% → 底图在卡片内向上移；
 * 向上滚动则相反。
 */
const PARALLAX_SCRUB = 1.2;

type CaseCardBgParallaxProps = {
  /** 限定在 main 内查询 .case-card，避免误选 */
  rootRef: RefObject<HTMLElement | null>;
};

export function CaseCardBgParallax({ rootRef }: CaseCardBgParallaxProps) {
  /**
   * 1) 用 useEffect，不用 useLayoutEffect：须晚于 LenisGsapBridge 的 useEffect（注册 scrollerProxy）。
   * 2) setTimeout(0)：同一 commit 内 effect 顺序不保证，推迟到下一 macrotask 可确保 proxy 已挂上。
   *    否则 ScrollTrigger 按原生 scroll 算进度，与 Lenis.scroll 脱节，scrub 几乎不动。
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scroller = document.documentElement;
    let ctx: gsap.Context | null = null;

    const timer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        const imgs = root.querySelectorAll<HTMLElement>(".case-card .case-card__bg-img");
        imgs.forEach((el) => {
          const img = el as HTMLImageElement;
          const card = img.closest(".case-card");
          if (!card) return;

          gsap.fromTo(
            img,
            {
              yPercent: PARALLAX_Y_PERCENT,
              scale: PARALLAX_COVER_SCALE,
              transformOrigin: "50% 50%",
            },
            {
              yPercent: -PARALLAX_Y_PERCENT,
              scale: PARALLAX_COVER_SCALE,
              transformOrigin: "50% 50%",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                scroller,
                start: "top bottom",
                end: "bottom top",
                scrub: PARALLAX_SCRUB,
                invalidateOnRefresh: true,
              },
            },
          );

        });
      }, root);
    }, 0);

    const onWinLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onWinLoad);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onWinLoad);
      ctx?.revert();
    };
  }, [rootRef]);

  return null;
}
