import { memo, useLayoutEffect, useRef } from "react";

import { gsap } from "../lib/gsapSetup";

const LINES = [
  "Digital Intelligence",
  "Generation",
  "Solutions",
] as const;

/** 逐字错开间隔（秒）；越小越密 */
const STAGGER_SEC = 0.04;
/** 首字前等待，对应常见 `delay=100` → 0.1s */
const ENTRANCE_DELAY_SEC = 0.1;
const ENTRANCE_DURATION = 0.55;
const CHAR_INITIAL_Y_PX = 36;

function charsOf(line: string) {
  return Array.from(line);
}

export const HeroSplitTitle = memo(function HeroSplitTitle({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const chars = root.querySelectorAll<HTMLElement>(".hero-line__char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        y: CHAR_INITIAL_Y_PX,
        duration: ENTRANCE_DURATION,
        ease: "power2.out",
        stagger: {
          each: STAGGER_SEC,
          from: "start",
        },
        delay: ENTRANCE_DELAY_SEC,
        force3D: true,
        roundProps: "y",
        onComplete: () => {
          gsap.set(chars, { clearProps: "transform" });
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  const ariaLabel = LINES.join(" ");

  if (reducedMotion) {
    return (
      <h1 className="hero-title">
        {LINES.map((line) => (
          <span key={line} className="hero-line">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1
      ref={rootRef}
      className="hero-title"
      aria-label={ariaLabel}
    >
      <span className="hero-title__split" aria-hidden="true">
        {LINES.map((line, lineIndex) => (
          <span key={lineIndex} className="hero-line">
            {charsOf(line).map((ch, i) => (
              <span key={`${lineIndex}-${i}`} className="hero-line__char">
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
});
