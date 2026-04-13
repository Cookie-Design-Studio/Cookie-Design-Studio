import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/** Digital 案例长图：三张横拼，无缝循环（整组重复拼接两次保证无限循环） */
const DIGITAL_FILM_IMAGES = [
  "/digital/work-1.png",
  "/digital/work-2.png",
  "/digital/work-3.png",
] as const;

/** 单组（三张）走完一圈的时长，与原 CSS 48s 一致 */
const LOOP_SECONDS = 48;

export function ProjectDetailFilmstrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    const marquee = marqueeRef.current;
    if (!track || !marquee) return;

    if (prefersReducedMotion) return;

    // 等待所有图片加载完成再开始动画，避免尺寸计算错误
    const waitForAllImagesLoaded = () =>
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

    // 监听尺寸变化更新动画基准
    const ro = new ResizeObserver(() => {
      // 尺寸变化后，我们不需要特别处理，因为单次循环会自动重新计算
    });
    ro.observe(marquee);

    track.style.opacity = "0";

    let rafRef = 0;
    let cancelled = false;
    let singleSetWidth = 0;

    const tick = (now: number) => {
      const fullWidth = track.scrollWidth;
      singleSetWidth = fullWidth / 2;

      if (singleSetWidth > 0) {
        const speed = singleSetWidth / LOOP_SECONDS;
        const elapsed = (now - performance.timing.navigationStart) / 1000;
        let distance = (elapsed * speed) % singleSetWidth;
        // x 从 0 移动到 -singleSetWidth，此时正好第二段接在第一段后面，循环无缝
        const x = -distance;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      rafRef = requestAnimationFrame(tick);
    };

    void waitForAllImagesLoaded().then(() => {
      if (cancelled) return;
      // 计算单组宽度后开始动画
      singleSetWidth = track.scrollWidth / 2;
      track.style.opacity = "1";
      rafRef = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef);
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
            {/* 第一组 */}
            {DIGITAL_FILM_IMAGES.map((src) => (
              <img
                key={`first-${src}`}
                className="project-detail__filmstrip-img"
                src={src}
                alt=""
                loading="eager"
                decoding="sync"
              />
            ))}
            {/* 第二组（重复）保证无限循环：当第一组完全移出，第二组正好进入起点 */}
            {DIGITAL_FILM_IMAGES.map((src) => (
              <img
                key={`second-${src}`}
                className="project-detail__filmstrip-img"
                src={src}
                alt=""
                loading="eager"
                decoding="sync"
              />
            ))}
            {/* 第三组兜底：极端情况下避免空白 */}
            {DIGITAL_FILM_IMAGES.map((src) => (
              <img
                key={`third-${src}`}
                className="project-detail__filmstrip-img"
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
