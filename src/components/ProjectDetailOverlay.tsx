import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";

import { gsap } from "../lib/gsapSetup";
import { LENIS_OPTIONS } from "../lib/lenisOptions";

export type ProjectDetailOverlayProps = {
  open: boolean;
  onClose: () => void;
  coverSrc: string;
  className?: string;
  /** 与 dialog aria-labelledby 一致，须对应 headline 内带 id 的元素 */
  ariaLabelledBy: string;
  headline: ReactNode;
  children?: ReactNode;
};

/** 详情层滚动：与全站共用阻尼参数，仅保留内部容器所需的 autoRaf */
const DETAIL_OVERLAY_LENIS_OPTIONS: LenisOptions = {
  ...LENIS_OPTIONS,
  autoRaf: true,
};

/** 打开时重置详情内滚动条，不驱动任何 React state（避免与滚动绑定的重渲染） */
function ProjectDetailLenisReset({ open }: { open: boolean }) {
  const lenis = useLenis();
  useLayoutEffect(() => {
    if (!open || !lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [open, lenis]);
  return null;
}

/** 标题：打开后自下而上入场；最终 y=0，与首屏 flex 水平垂直居中一致 */
const HEADLINE_REVEAL_LIFT_PX = 56;
const HEADLINE_ENTRANCE_SEC = 0.85;
/** 滚动开始就向上“跟走”的距离（越大越明显） */
const HEADLINE_SCROLL_LIFT_PX = 180;

function ProjectDetailStickyHero({
  coverSrc,
  headline,
}: {
  coverSrc: string;
  headline: ReactNode;
}) {
  const headlineRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const h = headlineRef.current;
    if (!h) return;

    const endY = 0;
    const startY = HEADLINE_REVEAL_LIFT_PX;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(h, { opacity: 1, y: endY, pointerEvents: "auto" });
        return;
      }
      gsap.set(h, { pointerEvents: "none" });

      // 打开时入场：自下而上淡入
      gsap.fromTo(
        h,
        { opacity: 0, y: startY },
        {
          opacity: 1,
          y: endY,
          duration: HEADLINE_ENTRANCE_SEC,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(h, { pointerEvents: "auto" });
          },
        },
      );
    }, h);

    return () => {
      ctx.revert();
    };
  }, [coverSrc]);

  useEffect(() => {
    const h = headlineRef.current;
    if (!h) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const scroller = h.closest<HTMLElement>(".project-detail__scroll");
    if (!scroller) return;

    let raf = 0;
    const maxLift = HEADLINE_SCROLL_LIFT_PX;

    const update = () => {
      const scrollTop = scroller.scrollTop;
      const span = Math.max(1, window.innerHeight * 0.9);
      const t = Math.min(1, Math.max(0, scrollTop / span));
      gsap.set(h, { y: -maxLift * t });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      onScroll();
    };

    update();
    window.addEventListener("resize", onResize);

    // 优先订阅 Lenis，避免与原生 scroll 双通道重复驱动
    const l = lenis as unknown as {
      on?: (e: string, cb: () => void) => void;
      off?: (e: string, cb: () => void) => void;
    };
    const onLenisScroll = () => onScroll();
    const hasLenisHook = Boolean(l?.on && l?.off);
    if (hasLenisHook) {
      l.on?.("scroll", onLenisScroll);
    } else {
      scroller.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      if (hasLenisHook) {
        l.off?.("scroll", onLenisScroll);
      } else {
        scroller.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [lenis]);

  return (
    <div className="project-detail__sticky-hero">
      <div className="project-detail__bg" aria-hidden="true">
        <img className="project-detail__bg-img" src={coverSrc} alt="" />
      </div>
      <div ref={headlineRef} className="project-detail__headline" lang="en">
        {headline}
      </div>
    </div>
  );
}

export function ProjectDetailOverlay({
  open,
  onClose,
  coverSrc,
  className,
  ariaLabelledBy,
  headline,
  children,
}: ProjectDetailOverlayProps) {
  const rootLenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const el = dialogRef.current;
    if (!el) return;

    const syncWidth = () => {
      el.style.setProperty(
        "--project-detail-w",
        `${document.documentElement.clientWidth}px`,
      );
    };

    syncWidth();
    rootLenis?.stop();

    window.addEventListener("resize", syncWidth);
    return () => {
      window.removeEventListener("resize", syncWidth);
      el.style.removeProperty("--project-detail-w");
      rootLenis?.start();
    };
  }, [open, rootLenis]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className={className ? `project-detail ${className}` : "project-detail"}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      tabIndex={-1}
    >
      <button
        type="button"
        className="project-detail__close"
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="project-detail__close-x" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 6L18 18M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </button>
      <ReactLenis
        root={false}
        options={DETAIL_OVERLAY_LENIS_OPTIONS}
        className="project-detail__scroll"
      >
        <ProjectDetailLenisReset open={open} />
        <div className="project-detail__scene">
          <ProjectDetailStickyHero coverSrc={coverSrc} headline={headline} />
        </div>
        {children}
      </ReactLenis>
    </div>
  );
}
