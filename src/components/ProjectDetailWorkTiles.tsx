const TILE_IMAGES = [
  "/images/work-5.png",
  "/images/work-6.png",
  "/images/work-7.png",
] as const;

/** Digital Twin 详情：跑马灯下方三图方格 */
export function ProjectDetailWorkTiles() {
  return (
    <section
      className="project-detail__work-tiles"
      aria-label="Additional imagery"
      lang="en"
    >
      <div className="project-detail__work-tiles-inner">
        {TILE_IMAGES.map((src) => (
          <div key={src} className="project-detail__work-tile">
            <img
              className="project-detail__work-tile-img"
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
