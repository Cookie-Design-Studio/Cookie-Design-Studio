import {
  type RefObject,
  Suspense,
  lazy,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { CaseCardBgParallax } from "./components/CaseCardBgParallax";
import { HeroIntroType } from "./components/HeroIntroType";
import { HeroSplitTitle } from "./components/HeroSplitTitle";
import { Header } from "./components/Header";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { gsap } from "./lib/gsapSetup";

/** 更换 showreel 后递增版本号，规避视频缓存 */
const HOME_VIDEO_REV = "4";
/** 文字揭示阶段滚动距离：滚完后再离开首屏 */
const HERO_REVEAL_SCROLL_PX = 760;
/** 初始额外下移量：首屏先露出后两行 */
const HERO_REVEAL_FROM_Y = 380;

/** 跑马灯单行重复次数，避免轨道留白 */
const CASE_SKILLS_SEGMENT_REPEAT = 14;
const CASE_SKILLS_LINES = [
  { text: "Diffusion LoRA ControlNet", baseSpeedPx: 0.55, direction: -1 },
  { text: "Motion Brand Systems Real-time", baseSpeedPx: 0.46, direction: 1 },
  { text: "Multimodal Neural Interactive", baseSpeedPx: 0.4, direction: -1 },
] as const;

const AigcDetailOverlay = lazy(() =>
  import("./components/AigcDetailOverlay").then((m) => ({
    default: m.AigcDetailOverlay,
  })),
);

const DigitalTwinDetailOverlay = lazy(() =>
  import("./components/DigitalTwinDetailOverlay").then((m) => ({
    default: m.DigitalTwinDetailOverlay,
  })),
);

const CaseSkillsMarqueeLine = memo(function CaseSkillsMarqueeLine({
  text,
  baseSpeedPx,
  direction,
}: {
  text: string;
  baseSpeedPx: number;
  direction: 1 | -1;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const segment = Array.from({ length: CASE_SKILLS_SEGMENT_REPEAT }, () => text).join(
    "   ",
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let rafId = 0;
    let posX = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

    const step = (now: number) => {
      const dt = Math.min(2, (now - lastTime) / 16.67);
      lastTime = now;

      const currentY = window.scrollY;
      const dy = currentY - lastY;
      lastY = currentY;

      const targetBoost = clamp(dy * 0.35, -14, 14);
      boost = lerp(boost, targetBoost, 0.16);

      posX += (direction * baseSpeedPx + boost) * dt;

      const segWidth = track.scrollWidth / 2;
      if (segWidth > 0) {
        if (posX <= -segWidth) posX += segWidth;
        if (posX >= 0) posX -= segWidth;
      }

      track.style.transform = `translate3d(${posX}px, 0, 0)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [baseSpeedPx, direction]);

  return (
    <div className="case-skills__marquee" aria-hidden="true">
      <div ref={wrapRef} className="case-skills__shift">
        <div ref={trackRef} className="case-skills__track">
          <div className="case-skills__chunk">{segment}</div>
          <div className="case-skills__chunk">{segment}</div>
        </div>
      </div>
    </div>
  );
});

/**
 * 首屏 showreel：标记 `loop` + 个别环境下 `ended` 兜底（Safari 等）。
 */
function useHeroShowreelLoop(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.loop = true;

    const restart = () => {
      requestAnimationFrame(() => {
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
        const p = v.play();
        if (p !== undefined) void p.catch(() => {});
      });
    };

    v.addEventListener("ended", restart);
    return () => v.removeEventListener("ended", restart);
  }, [videoRef]);
}

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [aigcDetailOpen, setAigcDetailOpen] = useState(false);
  const [digitalTwinDetailOpen, setDigitalTwinDetailOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const closeAigcDetail = useCallback(() => setAigcDetailOpen(false), []);
  const closeDigitalTwinDetail = useCallback(
    () => setDigitalTwinDetailOpen(false),
    [],
  );
  const openDigitalTwinDetail = useCallback(() => {
    setAigcDetailOpen(false);
    setDigitalTwinDetailOpen(true);
  }, []);
  const openAigcDetail = useCallback(() => {
    setDigitalTwinDetailOpen(false);
    setAigcDetailOpen(true);
  }, []);
  useHeroShowreelLoop(heroVideoRef);

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const hero = main.querySelector<HTMLElement>(".hero");
      const heroTextTrack = main.querySelector<HTMLElement>(".hero-text__track");
      if (!hero || !heroTextTrack) return;

      // Pin entire hero section so the whole thing (video + text) moves together
      // Pin spacing handled by GSAP to avoid卡顿 when scrolling back
      gsap.fromTo(
        heroTextTrack,
        { y: HERO_REVEAL_FROM_Y },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: `+=${HERO_REVEAL_SCROLL_PX}`,
            scrub: true,
            pin: hero,
            pinSpacing: true,
            pinType: "transform",
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
          },
        },
      );
    }, main);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div id="top">
      <Header />
      <main ref={mainRef} className="site-main">
        <CaseCardBgParallax rootRef={mainRef} />
        <section className="hero" aria-label="Introduction">
          <div className="hero-stage">
            <div className="hero-bg" aria-hidden>
              <video
                ref={heroVideoRef}
                className="hero-bg__video"
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                onCanPlay={(e) => {
                  const v = e.currentTarget;
                  if (!v.paused) return;
                  void v.play().catch(() => {});
                }}
              >
                <source
                  src={`/videos/showreel.webm?v=${HOME_VIDEO_REV}`}
                  type="video/webm"
                />
              </video>
            </div>
            <div className="hero-text">
              <div className="hero-text__track">
                <div className="hero-content">
                  <HeroSplitTitle reducedMotion={prefersReducedMotion} />
                  <HeroIntroType reducedMotion={prefersReducedMotion} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-cards" aria-label="Featured works" lang="en">
          <div className="case-cards__inner">
            <header className="case-work-bar">
              <h2 className="case-work-bar__title">Works</h2>
              <span className="case-work-bar__arrow-wrap" aria-hidden="true">
                <span className="case-work-bar__arrow">{"\u2B07"}</span>
              </span>
            </header>
            <article
              className="case-card case-card--on-dark case-card--dt"
              aria-labelledby="case-card-dt-title"
            >
              <div className="case-card__bg" aria-hidden="true">
                <img
                  className="case-card__bg-img"
                  src="/img/home-1.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="case-card__content">
                <div className="case-card__intro">
                  <p className="case-card__line case-card__line--meta">
                    Digital Twin · Spatial Intelligence
                  </p>
                  <p id="case-card-dt-title" className="case-card__line case-card__line--lead">
                    We map campuses, production lines, and equipment into interactive 3D
                    twins—connecting live data with simulation and predictive operations.
                  </p>
                </div>
                <a
                  className="case-card__cta case-card__cta--light"
                  href="#digital-twin"
                  onClick={(e) => {
                    e.preventDefault();
                    openDigitalTwinDetail();
                  }}
                >
                  <span className="case-card__cta-label">View project</span>
                  <span className="case-card__cta-arrow" aria-hidden>
                    →
                  </span>
                </a>
              </div>
            </article>
            <article
              className="case-card case-card--on-dark case-card--aigc"
              aria-labelledby="case-card-aigc-title"
            >
              <div className="case-card__bg" aria-hidden="true">
                <img
                  className="case-card__bg-img"
                  src="/img/home-2.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="case-card__content">
                <div className="case-card__intro">
                  <p className="case-card__line case-card__line--meta">
                    AIGC · Generative Content
                  </p>
                  <p id="case-card-aigc-title" className="case-card__line case-card__line--lead">
                    Multimodal models for end-to-end production of brand visuals, motion,
                    and interactive experiences.
                  </p>
                </div>
                <a
                  className="case-card__cta case-card__cta--light"
                  href="#aigc"
                  onClick={(e) => {
                    e.preventDefault();
                    openAigcDetail();
                  }}
                >
                  <span className="case-card__cta-label">View project</span>
                  <span className="case-card__cta-arrow" aria-hidden>
                    →
                  </span>
                </a>
              </div>
            </article>

            <article
              className="case-card case-card--on-dark case-card--aigc"
              aria-labelledby="case-card-project-3-title"
            >
              <div className="case-card__bg" aria-hidden="true">
                <img
                  className="case-card__bg-img"
                  src="/img/home-3.png"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="case-card__content">
                <div className="case-card__intro">
                  <p className="case-card__line case-card__line--meta">
                    Weirui Factory · Operations Wall
                  </p>
                  <p id="case-card-project-3-title" className="case-card__line case-card__line--lead">
                    Large-screen visualization for formation and grading workshops—live line
                    status, throughput, and quality signals brought together so teams can read
                    the plant at a glance.
                  </p>
                </div>
                <a
                  className="case-card__cta case-card__cta--light"
                  href="#project-3"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span className="case-card__cta-label">View project</span>
                  <span className="case-card__cta-arrow" aria-hidden>
                    →
                  </span>
                </a>
              </div>
            </article>

            <div
              className="case-skills"
              lang="en"
              aria-label="Capabilities and techniques"
            >
              {CASE_SKILLS_LINES.map((line) => (
                <CaseSkillsMarqueeLine
                  key={line.text}
                  text={line.text}
                  baseSpeedPx={line.baseSpeedPx}
                  direction={line.direction}
                />
              ))}
            </div>

            <header
              className="case-work-bar case-work-bar--dark"
              lang="en"
              aria-labelledby="case-contact-bar-title"
            >
              <h2 id="case-contact-bar-title" className="case-work-bar__title">
                Contact
              </h2>
              <span className="case-work-bar__arrow-wrap" aria-hidden="true">
                <span className="case-work-bar__arrow">{"\u2B07"}</span>
              </span>
            </header>
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        {digitalTwinDetailOpen ? (
          <DigitalTwinDetailOverlay
            open={digitalTwinDetailOpen}
            onClose={closeDigitalTwinDetail}
          />
        ) : null}
        {aigcDetailOpen ? (
          <AigcDetailOverlay open={aigcDetailOpen} onClose={closeAigcDetail} />
        ) : null}
      </Suspense>
    </div>
  );
}
