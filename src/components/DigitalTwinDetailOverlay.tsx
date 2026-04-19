import { ProjectDetailFilmstrip } from "./ProjectDetailFilmstrip";
import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { SplitText } from "@cookie-design-studio/ui";

type DigitalTwinDetailOverlayProps = {
  open: boolean;
  onClose: () => void;
};

/** 首屏 sticky 底图与首段视频 poster，与 `public/digital/digital-1.png` 一致 */
const DIGITAL_TWIN_HERO_COVER = "/digital/digital-1.png";

export function DigitalTwinDetailOverlay({
  open,
  onClose,
}: DigitalTwinDetailOverlayProps) {
  const ensureInlineAutoplay = (video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      void playPromise.catch(() => {});
    }
  };

  return (
    <ProjectDetailOverlay
      open={open}
      onClose={onClose}
      coverSrc={DIGITAL_TWIN_HERO_COVER}
      className="project-detail--digital"
      ariaLabelledBy="dt-detail-headline"
      headline={
        <>
          <SplitText
            id="dt-detail-headline"
            text="Digital Twin"
            tag="h2"
            className="project-detail__headline-line1"
            textAlign="left"
            delay={40}
            duration={1}
            splitType="chars, words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
          <SplitText
            text="Spatial Intelligence"
            tag="p"
            className="project-detail__headline-line2"
            textAlign="left"
            delay={35}
            duration={1}
            splitType="chars, words"
            from={{ opacity: 0, y: 28 }}
            to={{ opacity: 1, y: 0 }}
          />
          <SplitText
            text="We deliver enterprise-grade digital twins that unify live operations into one command view, accelerating decisions, reducing downtime, and turning complex production data into measurable business outcomes."
            tag="p"
            className="project-detail__headline-copy"
            textAlign="center"
            delay={16}
            duration={0.68}
            splitType="chars, words"
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
          />
        </>
      }
    >
      <section
        className="project-detail__digital-video-block project-detail__digital-video-block--with-module-intro"
        aria-labelledby="digital-basic-components-heading"
      >
        <div className="project-detail__digital-module-copy">
          <h2
            id="digital-basic-components-heading"
            className="project-detail__digital-module-title"
          >
            Basic Components
          </h2>
          <p
            className="project-detail__case-lede project-detail__case-lede--embedded"
            id="digital-basic-components-intro"
          >
            Basic components are the repeatable building blocks of the twin&apos;s
            interface—metrics, panels, and spatial readouts that make live
            operations legible at a glance. Below, we isolate a few primitives in
            motion before scaling them into full floor views.
          </p>
        </div>
        <div className="project-detail__video-stack">
          <div className="project-detail__video-card-inner">
            <video
              className="project-detail__video"
              src="/digital/work-11.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              controls={false}
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              disableRemotePlayback
              draggable={false}
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={(e) => ensureInlineAutoplay(e.currentTarget)}
              onLoadedData={(e) => ensureInlineAutoplay(e.currentTarget)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="project-detail__video-card-inner">
            <video
              className="project-detail__video"
              src="/digital/work-13.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              controls={false}
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              disableRemotePlayback
              draggable={false}
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={(e) => ensureInlineAutoplay(e.currentTarget)}
              onLoadedData={(e) => ensureInlineAutoplay(e.currentTarget)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="project-detail__video-card-inner">
            <video
              className="project-detail__video"
              src="/digital/work-12.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              controls={false}
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              disableRemotePlayback
              draggable={false}
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={(e) => ensureInlineAutoplay(e.currentTarget)}
              onLoadedData={(e) => ensureInlineAutoplay(e.currentTarget)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
      <ProjectDetailFilmstrip />
      <section className="project-detail__digital-square-grid" aria-label="Component cards">
        <div className="project-detail__digital-square-card project-detail__digital-square-card--hover-fade">
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--base"
            src="/digital/work-5.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--hover"
            src="/digital/work-8.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--hover-fade">
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--base"
            src="/digital/work-6.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--hover"
            src="/digital/work-9.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--hover-fade">
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--base"
            src="/digital/work-7.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--hover"
            src="/digital/work-10.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--hover-fade">
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--base"
            src="/digital/work-16.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--hover"
            src="/digital/work-17.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--hover-fade">
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--base"
            src="/digital/work-18.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--hover"
            src="/digital/work-19.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--hover-fade">
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--base"
            src="/digital/work-20.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="project-detail__digital-square-img project-detail__digital-square-img--hover"
            src="/digital/work-21.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-22.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-23.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
      <section
        className="project-detail__digital-square-grid project-detail__digital-square-grid--dark project-detail__digital-square-grid--feature project-detail__digital-square-grid--with-module-copy"
        aria-labelledby="digital-feature-components-heading"
      >
        <div className="project-detail__digital-module-copy">
          <h2
            id="digital-feature-components-heading"
            className="project-detail__digital-module-title"
          >
            Feature Components
          </h2>
          <p
            className="project-detail__case-lede project-detail__case-lede--embedded"
            id="digital-feature-components-intro"
          >
            Feature modules stack the basics into fuller surfaces—composed layouts
            where alarms, equipment states, and flows stay legible under load. The
            strip below shows how those interactions scale before you zoom back out
            to the whole floor.
          </p>
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-24.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-26.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-27.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
      <section
        className="project-detail__digital-square-grid project-detail__digital-square-grid--with-module-copy"
        aria-labelledby="digital-factory-floor-heading"
      >
        <div className="project-detail__digital-module-copy">
          <h2
            id="digital-factory-floor-heading"
            className="project-detail__digital-module-title project-detail__digital-module-title--on-light"
          >
            Factory Floor
          </h2>
          <p
            className="project-detail__case-lede project-detail__case-lede--embedded project-detail__case-lede--on-light"
            id="digital-factory-floor-intro"
          >
            Floor-scale canvases map cells, assets, and traffic patterns into one
            continuous space, so operators can pan, filter, and compare zones
            without losing orientation. The grid captures representative views across
            major plant areas.
          </p>
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-28.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-29.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-30.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        {[10, 11, 12, 13, 14, 15, 16, 17].map((zf) => (
          <div
            key={`zf-${zf}`}
            className="project-detail__digital-square-card project-detail__digital-square-card--wide"
          >
            <img
              className="project-detail__digital-square-img"
              src={`/digital/zf-${zf}.png`}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-28.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-29.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-30.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
      <section
        className="project-detail__digital-video-block project-detail__digital-video-block--with-module-intro project-detail__digital-video-block--assembly-line"
        aria-labelledby="digital-assembly-line-heading"
        style={{ background: "#0c0c0f" }}
      >
        <div className="project-detail__digital-module-copy">
          <h2
            id="digital-assembly-line-heading"
            className="project-detail__digital-module-title"
          >
            Assembly Line
          </h2>
          <p
            className="project-detail__case-lede project-detail__case-lede--embedded"
            id="digital-assembly-line-intro"
          >
            Line-level views focus on throughput, stations, and handoffs where
            seconds matter. The clips below show how motion, queues, and in-process
            inventory read together as the assembly line runs.
          </p>
        </div>
        <div
          className="project-detail__video-card-inner"
          style={{ background: "var(--surface-light)" }}
        >
          <img
            className="project-detail__video"
            src="/digital/work-31.png"
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div
          className="project-detail__video-card-inner"
          style={{ background: "var(--surface-light)" }}
        >
          <img
            className="project-detail__video"
            src="/digital/work-36.png"
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div
          className="project-detail__video-card-inner"
          style={{ background: "var(--surface-light)" }}
        >
          <video
            className="project-detail__video"
            src="/digital/work-41.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            disableRemotePlayback
            draggable={false}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={(e) => ensureInlineAutoplay(e.currentTarget)}
            onLoadedData={(e) => ensureInlineAutoplay(e.currentTarget)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          className="project-detail__video-card-inner"
          style={{ background: "var(--surface-light)" }}
        >
          <video
            className="project-detail__video"
            src="/digital/work-42.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            disableRemotePlayback
            draggable={false}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={(e) => ensureInlineAutoplay(e.currentTarget)}
            onLoadedData={(e) => ensureInlineAutoplay(e.currentTarget)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          className="project-detail__video-card-inner"
          style={{ background: "#0c0c0f" }}
        >
          <video
            className="project-detail__video"
            src="/digital/work-39.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            disableRemotePlayback
            draggable={false}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={(e) => ensureInlineAutoplay(e.currentTarget)}
            onLoadedData={(e) => ensureInlineAutoplay(e.currentTarget)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          className="project-detail__video-card-inner"
          style={{ background: "#0c0c0f" }}
        >
          <video
            className="project-detail__video"
            src="/digital/work-40.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            disableRemotePlayback
            draggable={false}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={(e) => ensureInlineAutoplay(e.currentTarget)}
            onLoadedData={(e) => ensureInlineAutoplay(e.currentTarget)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </ProjectDetailOverlay>
  );
}
