import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** 从页面顶部向下滚动多少像素内，标题从完全不透明过渡到完全透明 */
const SCROLL_FADE_DISTANCE = 420;
/** 与站内其余 ScrollTrigger 保持一致阻尼 */
const GLOBAL_SCROLL_SCRUB = 1.2;

export type SiteHeaderProps = {
  /** 左上角站点名或 Logo 文案 */
  siteTitle?: string;
  className?: string;
};

export function SiteHeader({
  siteTitle = "Cookie-Design-Studio",
  className,
}: SiteHeaderProps) {
  const logoRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logo,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: `+=${SCROLL_FADE_DISTANCE}`,
            scrub: GLOBAL_SCROLL_SCRUB,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        },
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <header className={className ?? "site-header"}>
      <span ref={logoRef} className="site-logo">
        {siteTitle}
      </span>
    </header>
  );
}
