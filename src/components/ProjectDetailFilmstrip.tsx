import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/** Digital 案例长图：三张横拼，无缝循环（半幅重复拼接） */
const DIGITAL_FILM_IMAGES = [
  "/digital/work-1.png",
  "/digital/work-2.png",
  "/digital/work-3.png",
] as const;

/** 单段（半幅）走完一圈的时长，与原 CSS 48s 一致 */
const LOOP_SECONDS = 48;

export function ProjectDetailFilmstrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const unitWidthRef = useRef(0);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    const track = trackRef.current;
    const marquee = marqueeRef.current;
    const unit = unitRef.current;
    if (!track || !marquee || !unit) return;

    if (prefersReducedMotion) return;

    const updateUnitWidth = () => {
      const w = unit.scrollWidth;
      unitWidthRef.current = w > 0 ? w : 0;
    };

    const waitForTrackReady = () =>
      Promise.all(
        Array.from(track.querySelectorAll("img")).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete && img.naturalWidth > 0) {
                resolve();
                return;
              }
              const done = () => {
                img.removeEventListener("load", done);
                img.removeEventListener("error", done);
                resolve();
              };
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
            }),
        ),
      );

    const ro = new ResizeObserver(() => {
      updateUnitWidth();
    });
    ro.observe(marquee);
    ro.observe(unit);

    track.style.opacity = "0";

    const tick = (now: number) => {
      const unitWidth = unitWidthRef.current;
      if (unitWidth > 0) {
        const speed = unitWidth / LOOP_SECONDS;
        const t = (now - startRef.current) / 1000;
        const dist = (t * speed) % unitWidth;
        const x = -Math.round(dist * 1000) / 1000;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    let cancelled = false;
    void waitForTrackReady().then(() => {
      if (cancelled) return;
      updateUnitWidth();
      startRef.current = performance.now();
      track.style.opacity = "1";
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      track.style.removeProperty("transform");
      track.style.removeProperty("opacity");
    };
  }, [prefersReducedMotion]);

  return (
    <section className="project-detail__filmstrip">
      <div className="project-detail__filmstrip-scale">
        <div ref={marqueeRef} className="project-detail__filmstrip-marquee">
          <div ref={trackRef} className="project-detail__filmstrip-track">
            <div ref={unitRef} className="project-detail__filmstrip-unit" aria-hidden>
              {DIGITAL_FILM_IMAGES.map((src) => (
                <img
                  key={`unit-a-${src}`}
                  className="project-detail__filmstrip-img"
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              ))}
            </div>
            <div className="project-detail__filmstrip-unit" aria-hidden>
              {DIGITAL_FILM_IMAGES.map((src) => (
                <img
                  key={`unit-b-${src}`}
                  className="project-detail__filmstrip-img"
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
