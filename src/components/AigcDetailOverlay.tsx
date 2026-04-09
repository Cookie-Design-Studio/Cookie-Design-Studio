import { ProjectDetailOverlay } from "./ProjectDetailOverlay";

type AigcDetailOverlayProps = {
  open: boolean;
  onClose: () => void;
};

/** 首屏 sticky 底图：`public/aigc/aigc-1.png` */
const COVER_SRC = "/aigc/aigc-1.png";

export function AigcDetailOverlay({ open, onClose }: AigcDetailOverlayProps) {
  return (
    <ProjectDetailOverlay
      open={open}
      onClose={onClose}
      coverSrc={COVER_SRC}
      className="project-detail--aigc"
      ariaLabelledBy="aigc-detail-headline"
      headline={
        <>
          <h2 id="aigc-detail-headline" className="project-detail__headline-line1">
            ZEEKR Full Series
          </h2>
          <p className="project-detail__headline-line2">
            <span className="project-detail__headline-line2-accent">AIGC</span>
            {" "}
            Automotive Design
          </p>
        </>
      }
    />
  );
}
