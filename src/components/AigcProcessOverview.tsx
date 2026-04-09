import { useCallback, useRef, useState } from "react";

/**
 * AIGC 详情页：首屏 scene 下方 —「流程概览」五卡横排（public/aigc/02-01 … 02-05）。
 */
const STEPS: readonly {
  step: string;
  label: string;
  /** 与 aigc 目录下文件名一致：02-01 … 02-05 */
  imageSrc: string;
  tone: "dark" | "light";
}[] = [
  { step: "01", label: "Full Models", imageSrc: "/aigc/02-01.png", tone: "dark" },
  { step: "02", label: "Detail Repair", imageSrc: "/aigc/02-02.png", tone: "light" },
  { step: "03", label: "Poster Design", imageSrc: "/aigc/02-03.png", tone: "light" },
  { step: "04", label: "Concept Design", imageSrc: "/aigc/02-04.png", tone: "dark" },
  { step: "05", label: "Component Design", imageSrc: "/aigc/02-05.png", tone: "dark" },
];

const TILT_MAX_DEG = 20;
const PERSPECTIVE_PX = 920;

function AigcProcessTiltCard({
  step,
  label,
  imageSrc,
  tone,
}: {
  step: string;
  label: string;
  imageSrc: string;
  tone: "dark" | "light";
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const reduceMotionRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const onPointerMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotionRef.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({
      rx: y * 2 * TILT_MAX_DEG,
      ry: -x * 2 * TILT_MAX_DEG,
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const transform = reduceMotionRef.current
    ? undefined
    : `perspective(${PERSPECTIVE_PX}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`;

  return (
    <li className="aigc-process__item">
      <div
        className={
          tone === "light"
            ? "aigc-process__card aigc-process__card--light"
            : "aigc-process__card"
        }
        style={transform ? { transform } : undefined}
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
      >
        <img
          className="aigc-process__card-img"
          src={imageSrc}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="aigc-process__step" aria-hidden>
          {step}
        </span>
      </div>
      <p className="aigc-process__label">{label}</p>
    </li>
  );
}

export function AigcProcessOverview() {
  return (
    <section
      className="aigc-process"
      aria-labelledby="aigc-process-title"
      lang="en"
    >
      <h2 id="aigc-process-title" className="aigc-process__title">
        <span className="aigc-process__title-line">Overview of the</span>
        <span className="aigc-process__title-line">AIGC Project Process</span>
      </h2>
      <ul className="aigc-process__row">
        {STEPS.map((props) => (
          <AigcProcessTiltCard key={props.step} {...props} />
        ))}
      </ul>
    </section>
  );
}
