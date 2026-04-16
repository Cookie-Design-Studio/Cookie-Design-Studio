import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { SplitText } from "./SplitText";

type WeiruiDetailOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const WEIRUI_HERO_COVER = "/img/home-3.png";

export function WeiruiDetailOverlay({ open, onClose }: WeiruiDetailOverlayProps) {
  return (
    <ProjectDetailOverlay
      open={open}
      onClose={onClose}
      coverSrc={WEIRUI_HERO_COVER}
      className="project-detail--weirui"
      ariaLabelledBy="weirui-detail-headline"
      headline={
        <>
          <SplitText
            id="weirui-detail-headline"
            text="Weirui Factory"
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
            <SplitText
              text="Operations"
              tag="span"
              className="project-detail__headline-line2-accent"
              textAlign="left"
              delay={35}
              duration={1}
              splitType="chars, words"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />
            <SplitText
              text="Wall"
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
          <SplitText
            text="Large-screen visualization for formation and grading workshops, where live line status, throughput, and quality signals are brought together so teams can read the plant at a glance."
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
    />
  );
}
