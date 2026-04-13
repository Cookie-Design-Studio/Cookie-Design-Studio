import { ProjectDetailFilmstrip } from "./ProjectDetailFilmstrip";
import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { SplitText } from "./SplitText";

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
        </>
      }
    >
      <header
        className="case-work-bar case-work-bar--dark"
        aria-label="Basic Components"
      >
        <h2 className="case-work-bar__title">Basic Components</h2>
        <span className="case-work-bar__arrow-wrap" aria-hidden="true">
          <span className="case-work-bar__arrow">{"\u2B07"}</span>
        </span>
      </header>
      <section
        className="project-detail__digital-video-block"
        aria-label="Component videos"
      >
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
      </section>
      <header
        className="case-work-bar case-work-bar--feature"
        aria-label="Feature Components"
      >
        <h2 className="case-work-bar__title">Feature Components</h2>
        <span className="case-work-bar__arrow-wrap" aria-hidden="true">
          <span className="case-work-bar__arrow">{"\u2B07"}</span>
        </span>
      </header>
      <section
        className="project-detail__digital-square-grid project-detail__digital-square-grid--feature"
        aria-label="Component cards feature strip"
      >
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
      <header
        className="case-work-bar case-work-bar--feature"
        aria-label="Factory Floor"
      >
        <h2 className="case-work-bar__title">Factory Floor</h2>
        <span className="case-work-bar__arrow-wrap" aria-hidden="true">
          <span className="case-work-bar__arrow">{"\u2B07"}</span>
        </span>
      </header>
      <section
        className="project-detail__digital-square-grid"
        aria-label="Factory Floor"
      >
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
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-31.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
          <img
            className="project-detail__digital-square-img"
            src="/digital/work-36.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-detail__digital-square-card project-detail__digital-square-card--wide">
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
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </ProjectDetailOverlay>
  );
}
