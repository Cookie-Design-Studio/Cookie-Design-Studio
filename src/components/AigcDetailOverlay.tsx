import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { SplitText } from "./SplitText";

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
          <SplitText
            id="aigc-detail-headline"
            text="ZEEKR Full Series"
            tag="h2"
            className="project-detail__headline-line1"
            textAlign="left"
            delay={40}
            duration={1}
            splitType="chars, words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="project-detail__headline-line2">
            <span className="project-detail__headline-line2-accent">
              <SplitText
                text="AIGC"
                tag="span"
                className=""
                textAlign="left"
                delay={35}
                duration={1}
                splitType="chars, words"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
              />
            </span>
            <SplitText
              text=" Automotive Design"
              tag="span"
              className=""
              textAlign="left"
              delay={35}
              duration={1}
              splitType="chars, words"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />
          </p>
        </>
      }
    />
  );
}
