import { memo, useLayoutEffect, useRef } from "react";

import { gsap } from "../lib/gsapSetup";

const INTRO_LINES = [
  "We partner with enterprises to design and ship",
  "brand, spatial, and generative solutions",
  "from first concept to production rollout.",
] as const;

/** 打字机感：逐字显现间隔（秒） */
const CHAR_STAGGER_SEC = 0.038;
/** 单字淡入时长 */
const CHAR_DURATION_SEC = 0.1;
/** 与标题 Split 动画衔接：略晚于首屏标题再开始 */
const INTRO_START_DELAY_SEC = 1.15;

const FULL_ARIA_LABEL = INTRO_LINES.join(" ");

function charsOf(line: string) {
  return Array.from(line);
}

export const HeroIntroType = memo(function HeroIntroType({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const chars = root.querySelectorAll<HTMLElement>(".hero-intro__char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        duration: CHAR_DURATION_SEC,
        ease: "power1.out",
        stagger: {
          each: CHAR_STAGGER_SEC,
          from: "start",
        },
        delay: INTRO_START_DELAY_SEC,
        force3D: true,
        onComplete: () => {
          gsap.set(chars, { clearProps: "transform" });
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="hero-intro" lang="en">
        <p className="hero-intro__block">
          {INTRO_LINES.map((line) => (
            <span key={line} className="hero-intro__line">
              {line}
            </span>
          ))}
        </p>
      </div>
    );
  }

  return (
    <div className="hero-intro" lang="en">
      <p
        ref={rootRef}
        className="hero-intro__block"
        aria-label={FULL_ARIA_LABEL}
      >
        <span className="hero-intro__type" aria-hidden="true">
          {INTRO_LINES.map((line, lineIndex) => (
            <span key={lineIndex} className="hero-intro__line">
              {charsOf(line).map((ch, i) => (
                <span key={`${lineIndex}-${i}`} className="hero-intro__char">
                  {ch === " " ? "\u00a0" : ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      </p>
    </div>
  );
});
