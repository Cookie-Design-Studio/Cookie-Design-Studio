/**
 * AIGC 详情页滚动区内容（接在首屏 sticky 场景之后）。
 * 配图暂用 work-1 / work-2 与 aigc-page-reference 占位，可逐张替换为正式切图。
 */
const IMG = {
  a: "/images/work-1.png",
  b: "/images/work-2.png",
  ref: "/images/aigc-page-reference.png",
} as const;

const THUMB_LABELS = ["001", "007", "009", "X", "MIX"] as const;

export function AigcDetailSections() {
  return (
    <div className="aigc-sections" lang="en">
      {/* 车型缩略条 */}
      <section
        className="aigc-section aigc-section--thumbs"
        aria-label="Model thumbnails"
      >
        <ul className="aigc-thumbs">
          {THUMB_LABELS.map((label, i) => (
            <li key={label} className="aigc-thumbs__item">
              <figure className="aigc-thumbs__fig">
                <img
                  src={i % 2 === 0 ? IMG.a : IMG.b}
                  alt=""
                  className="aigc-thumbs__img"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="aigc-thumbs__cap">{label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* 浅底：主视觉 + 文案 */}
      <section className="aigc-section aigc-section--light aigc-section--split">
        <div className="aigc-section__copy">
          <p className="aigc-section__kicker">Spatial intelligence</p>
          <h3 className="aigc-section__title">
            Multimodal pipelines for exterior and CMF exploration.
          </h3>
          <p className="aigc-section__body">
            Generative passes iterate lighting, materials, and environment—keeping
            brand DNA aligned while exploring form and detail at scale.
          </p>
        </div>
        <div className="aigc-section__visual">
          <img
            src={IMG.a}
            alt=""
            className="aigc-section__img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* 深色：探索网格 */}
      <section
        className="aigc-section aigc-section--dark"
        aria-label="AIGC exploration grid"
      >
        <header className="aigc-section__header">
          <h3 className="aigc-section__title aigc-section__title--on-dark">
            Design exploration
          </h3>
          <p className="aigc-section__sub aigc-section__sub--muted">
            Variations across environments and briefs
          </p>
        </header>
        <div className="aigc-mosaic aigc-mosaic--dense">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aigc-mosaic__cell">
              <img
                src={i % 2 === 0 ? IMG.b : IMG.a}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 规格 / 数据占位 */}
      <section className="aigc-section aigc-section--spec" aria-label="Highlights">
        <div className="aigc-spec">
          <ul className="aigc-spec__list">
            <li>End-to-end visual production</li>
            <li>Brand guardrails & palettes</li>
            <li>Human-in-the-loop sign-off</li>
          </ul>
          <div className="aigc-spec__panel">
            <p className="aigc-spec__label">Output</p>
            <p className="aigc-spec__value">
              Still · motion · lightweight interactive
            </p>
          </div>
        </div>
      </section>

      {/* 白底：大图展示 */}
      <section className="aigc-section aigc-section--white">
        <div className="aigc-section__hero-img">
          <img
            src={IMG.a}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="aigc-section__hero-img aigc-section__hero-img--wide">
          <img
            src={IMG.b}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* 设计稿长图（便于对照 Figma；文件较大时可改为分段切图） */}
      <section className="aigc-section aigc-section--reference">
        <img
          src={IMG.ref}
          alt=""
          className="aigc-section__reference-img"
          loading="lazy"
          decoding="async"
        />
      </section>
    </div>
  );
}
