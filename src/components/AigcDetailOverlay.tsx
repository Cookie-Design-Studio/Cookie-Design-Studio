import { useRef, useState } from "react";
import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { SplitText } from "./SplitText";

type AigcDetailOverlayProps = {
  open: boolean;
  onClose: () => void;
};

/** 首屏 sticky 底图：`public/aigc/aigc-1.png` */
const COVER_SRC = "/aigc/aigc-1.png";

const DETAIL_IMAGES = [
  "/aigc/detail-1.png",
  "/aigc/detail-2.png",
  "/aigc/detail-3.png",
  "/aigc/detail-4.png",
  "/aigc/detail-5.png",
  "/aigc/detail-6.png",
  "/aigc/detail-7.png",
] as const;

function ShowcaseNavChevronLeft() {
  return (
    <svg
      className="aigc-process-showcase__nav-icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
    >
      <path
        d="M15 7L9 12l6 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShowcaseNavChevronRight() {
  return (
    <svg
      className="aigc-process-showcase__nav-icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
    >
      <path
        d="M9 7l6 5-6 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HB_POSTER_STEPS = [
  {
    src: "/aigc/hb-1.png",
    stepLabel: "STEP 01",
    description: "Choose the right text–to–image",
  },
  {
    src: "/aigc/hb-2.png",
    stepLabel: "STEP 02",
    description: "Choose the right background",
  },
  {
    src: "/aigc/hb-3.png",
    stepLabel: "STEP 03",
    description: "Expand image background",
  },
  {
    src: "/aigc/hb-4.png",
    stepLabel: "STEP 04",
    description: "Add appropriate text to the poster",
  },
] as const;

export function AigcDetailOverlay({ open, onClose }: AigcDetailOverlayProps) {
  const datasetImages = ["/aigc/data-001.png", "/aigc/data-7x.png", "/aigc/data-9x.png"] as const;
  const datasetTitles = ["ZEEKR 001 Dataset", "ZEEKR 7X Dataset", "ZEEKR 9X Dataset"] as const;
  const aitookitImages = ["/aigc/aitookit-1.png", "/aigc/aitookit-2.png"] as const;
  const [datasetImageIndex, setDatasetImageIndex] = useState(0);
  const [aitookitImageIndex, setAitookitImageIndex] = useState(0);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const maskComparePairs = [
    { base: "/aigc/mask-2-01.png", top: "/aigc/mask-2-02.png" },
    { base: "/aigc/mask-1-01.png", top: "/aigc/mask-1-02.png" },
  ] as const;
  const [maskPairIndex, setMaskPairIndex] = useState(0);
  const [maskSplitPercent, setMaskSplitPercent] = useState(50);
  const maskCompareRef = useRef<HTMLDivElement>(null);

  const showPrevDatasetImage = () => {
    setDatasetImageIndex((prev) => (prev - 1 + datasetImages.length) % datasetImages.length);
  };

  const showNextDatasetImage = () => {
    setDatasetImageIndex((prev) => (prev + 1) % datasetImages.length);
  };

  const showPrevAitookitImage = () => {
    setAitookitImageIndex((prev) => (prev - 1 + aitookitImages.length) % aitookitImages.length);
  };

  const showNextAitookitImage = () => {
    setAitookitImageIndex((prev) => (prev + 1) % aitookitImages.length);
  };

  const showPrevMaskPair = () => {
    setMaskPairIndex((prev) => (prev - 1 + maskComparePairs.length) % maskComparePairs.length);
  };

  const showNextMaskPair = () => {
    setMaskPairIndex((prev) => (prev + 1) % maskComparePairs.length);
  };

  const updateMaskSplitByClientX = (clientX: number) => {
    const el = maskCompareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, ratio));
    setMaskSplitPercent(clamped * 100);
  };

  const jumpToShowcase = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
            <SplitText
              text="AIGC"
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
              text="Automotive Design"
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
            text="We deliver enterprise-grade AIGC pipelines for automotive design, accelerating concept generation, visual consistency, and campaign-ready outputs across the full product line."
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
      <section className="aigc-process-overview" aria-label="Overview of the AIGC Project Process">
        <div className="aigc-process-overview__stack">
          <h3 className="aigc-process-overview__title">
            <span>Overview of the</span>
            <span>AIGC Project Process</span>
          </h3>
          <div className="aigc-process-overview__grid">
          <div className="aigc-process-overview__item">
            <button
              type="button"
              className="aigc-process-overview__card"
              onClick={() => jumpToShowcase("aigc-showcase-1")}
              aria-label="Go to showcase image 1"
            >
              <span className="aigc-process-overview__index">01</span>
              <img className="aigc-process-overview__img" src="/aigc/02-01.png" alt="" />
            </button>
            <p className="aigc-process-overview__label">Full Models</p>
          </div>
          <div className="aigc-process-overview__item">
            <button
              type="button"
              className="aigc-process-overview__card"
              onClick={() => jumpToShowcase("aigc-showcase-2")}
              aria-label="Go to showcase image 2"
            >
              <span className="aigc-process-overview__index">02</span>
              <img className="aigc-process-overview__img" src="/aigc/02-02.png" alt="" />
            </button>
            <p className="aigc-process-overview__label">Detail Repair</p>
          </div>
          <div className="aigc-process-overview__item">
            <button
              type="button"
              className="aigc-process-overview__card"
              onClick={() => jumpToShowcase("aigc-showcase-3")}
              aria-label="Go to showcase image 3"
            >
              <span className="aigc-process-overview__index">03</span>
              <img className="aigc-process-overview__img" src="/aigc/02-03.png" alt="" />
            </button>
            <p className="aigc-process-overview__label">Poster Design</p>
          </div>
          <div className="aigc-process-overview__item">
            <button
              type="button"
              className="aigc-process-overview__card"
              onClick={() => jumpToShowcase("aigc-showcase-4")}
              aria-label="Go to showcase image 4"
            >
              <span className="aigc-process-overview__index">04</span>
              <img className="aigc-process-overview__img" src="/aigc/02-04.png" alt="" />
            </button>
            <p className="aigc-process-overview__label">Concept Design</p>
          </div>
          <div className="aigc-process-overview__item">
            <button
              type="button"
              className="aigc-process-overview__card"
              onClick={() => jumpToShowcase("aigc-showcase-5")}
              aria-label="Go to showcase image 5"
            >
              <span className="aigc-process-overview__index">05</span>
              <img className="aigc-process-overview__img" src="/aigc/02-05.png" alt="" />
            </button>
            <p className="aigc-process-overview__label">Component Design</p>
          </div>
          </div>
        </div>
      </section>
      <section className="aigc-process-showcase" aria-label="AIGC process showcase images">
        <div id="aigc-showcase-1" className="aigc-process-showcase__item">
          <img className="aigc-process-showcase__img" src="/aigc/img-02.png" alt="" />
          <div className="aigc-process-showcase__white-block" aria-hidden="true">
            <div className="aigc-process-showcase__black-rounded">
              <p className="aigc-process-showcase__black-line1">
                Standardized Batch Processing Dataset
              </p>
              <p className="aigc-process-showcase__black-line2">
                {datasetTitles[datasetImageIndex]}
              </p>
              <div className="aigc-process-showcase__black-media">
                <button
                  type="button"
                  className="aigc-process-showcase__nav aigc-process-showcase__nav--prev"
                  onClick={showPrevDatasetImage}
                  aria-label="Previous dataset image"
                >
                  <ShowcaseNavChevronLeft />
                </button>
                <img
                  className="aigc-process-showcase__black-img"
                  src={datasetImages[datasetImageIndex]}
                  alt=""
                />
                <button
                  type="button"
                  className="aigc-process-showcase__nav aigc-process-showcase__nav--next"
                  onClick={showNextDatasetImage}
                  aria-label="Next dataset image"
                >
                  <ShowcaseNavChevronRight />
                </button>
              </div>
              <div className="aigc-process-showcase__black-media aigc-process-showcase__black-media--secondary">
                <button
                  type="button"
                  className="aigc-process-showcase__nav aigc-process-showcase__nav--prev"
                  onClick={showPrevAitookitImage}
                  aria-label="Previous AIToolkit image"
                >
                  <ShowcaseNavChevronLeft />
                </button>
                <img
                  className="aigc-process-showcase__black-img"
                  src={aitookitImages[aitookitImageIndex]}
                  alt=""
                />
                <button
                  type="button"
                  className="aigc-process-showcase__nav aigc-process-showcase__nav--next"
                  onClick={showNextAitookitImage}
                  aria-label="Next AIToolkit image"
                >
                  <ShowcaseNavChevronRight />
                </button>
              </div>
            </div>
            <div className="aigc-process-showcase__thumb-grid" aria-hidden="true">
              <div className="aigc-process-showcase__thumb-card">
                <img className="aigc-process-showcase__thumb-img" src="/aigc/03-01.png" alt="" />
                <div className="aigc-process-showcase__thumb-copy">
                  <p className="aigc-process-showcase__thumb-line1">ZEEKR 001</p>
                  <p className="aigc-process-showcase__thumb-line2">8000 Steps</p>
                </div>
              </div>
              <div className="aigc-process-showcase__thumb-card">
                <img className="aigc-process-showcase__thumb-img" src="/aigc/03-02.png" alt="" />
                <div className="aigc-process-showcase__thumb-copy">
                  <p className="aigc-process-showcase__thumb-line1">ZEEKR 7X</p>
                  <p className="aigc-process-showcase__thumb-line2">6000 Steps</p>
                </div>
              </div>
              <div className="aigc-process-showcase__thumb-card">
                <img className="aigc-process-showcase__thumb-img" src="/aigc/03-03.png" alt="" />
                <div className="aigc-process-showcase__thumb-copy">
                  <p className="aigc-process-showcase__thumb-line1">ZEEKR 9X</p>
                  <p className="aigc-process-showcase__thumb-line2">5000 Steps</p>
                </div>
              </div>
              <div className="aigc-process-showcase__thumb-card">
                <img className="aigc-process-showcase__thumb-img" src="/aigc/03-04.png" alt="" />
                <div className="aigc-process-showcase__thumb-copy">
                  <p className="aigc-process-showcase__thumb-line1">ZEEKR MIX</p>
                  <p className="aigc-process-showcase__thumb-line2">4000 Steps</p>
                </div>
              </div>
              <div className="aigc-process-showcase__thumb-card">
                <img className="aigc-process-showcase__thumb-img" src="/aigc/03-05.png" alt="" />
                <div className="aigc-process-showcase__thumb-copy">
                  <p className="aigc-process-showcase__thumb-line1">ZEEKR X</p>
                  <p className="aigc-process-showcase__thumb-line2">4000 Steps</p>
                </div>
              </div>
              <div className="aigc-process-showcase__thumb-card">
                <img className="aigc-process-showcase__thumb-img" src="/aigc/03-06.png" alt="" />
                <div className="aigc-process-showcase__thumb-copy aigc-process-showcase__thumb-copy--center">
                  <p className="aigc-process-showcase__thumb-line1 aigc-process-showcase__thumb-line1--center">
                    COMING
                    <br />
                    SOON
                  </p>
                  <p className="aigc-process-showcase__thumb-line2 aigc-process-showcase__thumb-line2--center">
                    New series
                  </p>
                </div>
              </div>
            </div>
            <div
              ref={maskCompareRef}
              className="aigc-process-showcase__compare"
              onMouseMove={(e) => updateMaskSplitByClientX(e.clientX)}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                if (!touch) return;
                updateMaskSplitByClientX(touch.clientX);
              }}
            >
              <img
                className="aigc-process-showcase__compare-img aigc-process-showcase__compare-img--base"
                src={maskComparePairs[maskPairIndex].base}
                alt=""
              />
              <button
                type="button"
                className="aigc-process-showcase__nav aigc-process-showcase__nav--prev"
                onClick={showPrevMaskPair}
                aria-label="Previous compare image set"
              >
                <ShowcaseNavChevronLeft />
              </button>
              <div
                className="aigc-process-showcase__compare-overlay"
                style={{ clipPath: `inset(0 0 0 ${maskSplitPercent}%)` }}
              >
                <img
                  className="aigc-process-showcase__compare-img aigc-process-showcase__compare-img--top"
                  src={maskComparePairs[maskPairIndex].top}
                  alt=""
                />
              </div>
              <button
                type="button"
                className="aigc-process-showcase__nav aigc-process-showcase__nav--next"
                onClick={showNextMaskPair}
                aria-label="Next compare image set"
              >
                <ShowcaseNavChevronRight />
              </button>
              <div
                className="aigc-process-showcase__compare-divider"
                style={{ left: `${maskSplitPercent}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="aigc-process-showcase__copy aigc-process-showcase__copy--left">
            <p className="aigc-process-showcase__line1">01 Full Models</p>
            <p className="aigc-process-showcase__line2">
              Lora Model Training for
              <br />
              Various Car Models
            </p>
            <p className="aigc-process-showcase__line3">
              LoRA Training for
              <br />
              Various Car Models
            </p>
          </div>
        </div>
        <div id="aigc-showcase-2" className="aigc-process-showcase__item">
          <img className="aigc-process-showcase__img" src="/aigc/img-03.png" alt="" />
          <div className="aigc-process-showcase__copy aigc-process-showcase__copy--right">
            <p className="aigc-process-showcase__line1">02 Detail Repair</p>
            <p className="aigc-process-showcase__line2">
              Detailed Repairs for
              <br />
              Each Vehicle Model
            </p>
            <p className="aigc-process-showcase__line3">
              Lora Model Training for
              <br />
              Various Car Models
            </p>
          </div>
        </div>
        <section className="aigc-detail-reasons" aria-label="Detail repair reasons">
          <div className="aigc-detail-reasons__inner">
            <div className="aigc-detail-reasons__text">
              <p className="aigc-detail-reasons__line1">About the real reasons for the details</p>
              <p className="aigc-detail-reasons__line2">
                When training&apos;s car model LoRA&apos; in FLUX, small, high-frequency details
                like license plates and car logos are the easiest to lose. This is usually not
                just an issue with a single parameter, but a result of the model mechanism
                combined with the data and training settings.
              </p>
            </div>
            <div className="aigc-detail-reasons__media">
              <img className="aigc-detail-reasons__img" src="/aigc/problem-14.png" alt="" />
            </div>
          </div>
        </section>
        <section className="aigc-fix-intro" aria-label="How to address detail issues">
          <p className="aigc-fix-intro__line1">How To Address Such Issues?</p>
          <p className="aigc-fix-intro__line2">Detailed Repairs for Each Vehicle Model</p>
          <div className="aigc-fix-intro__grid" aria-hidden="true">
            <div className="aigc-fix-intro__card">
              <img className="aigc-fix-intro__img" src="/aigc/fix-1.png" alt="" />
            </div>
            <div className="aigc-fix-intro__card">
              <img className="aigc-fix-intro__img" src="/aigc/fix-2.png" alt="" />
            </div>
            <div className="aigc-fix-intro__card">
              <img className="aigc-fix-intro__img" src="/aigc/fix-3.png" alt="" />
            </div>
          </div>
          <div className="aigc-fix-intro__single" aria-hidden="true">
            <img className="aigc-fix-intro__img" src="/aigc/fix-4.png" alt="" />
          </div>
          <div className="aigc-process-showcase__black-rounded">
            <p className="aigc-process-showcase__black-line1">
              Standardized Batch Processing Dataset
            </p>
            <p className="aigc-process-showcase__black-line2">Repair reference</p>
            <div className="aigc-process-showcase__black-media">
              <img
                className="aigc-process-showcase__black-img"
                src="/aigc/fix-5.png"
                alt=""
              />
            </div>
          </div>
          <div className="aigc-process-showcase__black-rounded">
            <div className="aigc-process-showcase__black-media aigc-fix-intro__detail-media">
              <img
                className="aigc-process-showcase__black-img"
                src={DETAIL_IMAGES[detailImageIndex]}
                alt=""
              />
            </div>
            <div
              className="aigc-fix-intro__detail-thumbs"
              role="tablist"
              aria-label="Select detail image"
            >
              {DETAIL_IMAGES.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === detailImageIndex}
                  aria-label={`Detail ${i + 1}`}
                  className={
                    i === detailImageIndex
                      ? "aigc-fix-intro__detail-thumb aigc-fix-intro__detail-thumb--current"
                      : "aigc-fix-intro__detail-thumb"
                  }
                  onMouseEnter={() => setDetailImageIndex(i)}
                  onFocus={() => setDetailImageIndex(i)}
                  onClick={() => setDetailImageIndex(i)}
                >
                  <img className="aigc-fix-intro__detail-thumb-img" src={src} alt="" />
                </button>
              ))}
            </div>
          </div>
        </section>
        <div id="aigc-showcase-3" className="aigc-process-showcase__item">
          <img className="aigc-process-showcase__img" src="/aigc/img-04.png" alt="" />
          <div
            className="aigc-showcase-hb"
            aria-labelledby="aigc-showcase-hb-title"
          >
            <p id="aigc-showcase-hb-title" className="aigc-showcase-hb__title">
              How To Create A Car Poster
            </p>
            <div className="aigc-showcase-hb__grid">
              {HB_POSTER_STEPS.map((item) => (
                <div key={item.src} className="aigc-showcase-hb__col">
                  <div className="aigc-showcase-hb__card">
                    <img className="aigc-showcase-hb__img" src={item.src} alt="" />
                  </div>
                  <div className="aigc-showcase-hb__copy">
                    <p className="aigc-showcase-hb__step">{item.stepLabel}</p>
                    <p className="aigc-showcase-hb__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="aigc-showcase-hb-follow"
            aria-labelledby="aigc-showcase-hb-follow-title"
          >
            <div className="aigc-showcase-hb-follow__intro">
              <h2 id="aigc-showcase-hb-follow-title" className="aigc-showcase-hb-follow__title">
                AI Enables Designers To Also Generate Code
              </h2>
              <p className="aigc-showcase-hb-follow__sub">
                A simple poster editor can be used to create posters at any time
              </p>
            </div>
            <div className="aigc-showcase-hb-follow__inner">
              <img
                className="aigc-showcase-hb-follow__img"
                src="/aigc/hb-5.png"
                alt=""
              />
            </div>
          </div>
          <div className="aigc-process-showcase__copy aigc-process-showcase__copy--left">
            <p className="aigc-process-showcase__line1">03 Poster Design</p>
            <p className="aigc-process-showcase__line2">
              Generative Car
              <br />
              Poster Design
            </p>
            <p className="aigc-process-showcase__line3">
              Generative Car
              <br />
              Poster Design
            </p>
          </div>
        </div>
        <div id="aigc-showcase-4" className="aigc-process-showcase__item">
          <img className="aigc-process-showcase__img" src="/aigc/img-05.png" alt="" />
          <div className="aigc-process-showcase__copy aigc-process-showcase__copy--right">
            <p className="aigc-process-showcase__line1">04 Concept Design</p>
            <p className="aigc-process-showcase__line2">
              Generative Car
              <br />
              Concept Design
            </p>
            <p className="aigc-process-showcase__line3">
              Generative Car
              <br />
              Concept Design
            </p>
          </div>
        </div>
        <div id="aigc-showcase-5" className="aigc-process-showcase__item">
          <img className="aigc-process-showcase__img" src="/aigc/img-06.png" alt="" />
          <div className="aigc-process-showcase__copy aigc-process-showcase__copy--left">
            <p className="aigc-process-showcase__line1">05 Component Design</p>
            <p className="aigc-process-showcase__line2">
              Generative Automotive
              <br />
              Parts Design
            </p>
            <p className="aigc-process-showcase__line3">
              Generative Automotive
              <br />
              Parts Design
            </p>
          </div>
        </div>
      </section>
    </ProjectDetailOverlay>
  );
}
