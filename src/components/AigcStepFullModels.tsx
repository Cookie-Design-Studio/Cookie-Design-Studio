/**
 * AIGC 详情：01 Full Models — 首屏整屏渐变 + 下方数据集单图。
 */

const DATASET_IMAGE_SRC = "/images/work-2.png";

export function AigcStepFullModels() {
  return (
    <section
      className="aigc-step aigc-step--full-models"
      aria-labelledby="aigc-step-full-models-title"
      lang="en"
    >
      <div className="aigc-step__hero">
        <div
          className="aigc-step__visual"
          aria-hidden="true"
          role="presentation"
        />
        <div className="aigc-step__inner aigc-step__inner--img-02">
          <div className="aigc-step__copy">
            <p className="aigc-step__kicker">01 Full Models</p>
            <h2 id="aigc-step-full-models-title" className="aigc-step__title">
              <span className="aigc-step__title-line">Lora Model Training for</span>
              <span className="aigc-step__title-line">Various Car Models</span>
            </h2>
            <p className="aigc-step__desc">
              LoRA Training for Various Car Models
            </p>
          </div>
        </div>
      </div>

      <div
        className="aigc-dataset"
        aria-labelledby="aigc-dataset-heading"
      >
        <div className="aigc-dataset__shell">
          <h3 id="aigc-dataset-heading" className="aigc-dataset__title">
            Standardized Batch Processing Dataset
          </h3>
          <p className="aigc-dataset__subtitle">ZEEKR 001 Dataset</p>

          <div className="aigc-dataset__panel">
            <img
              className="aigc-dataset__img"
              src={DATASET_IMAGE_SRC}
              alt="ZEEKR 001 dataset preview"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
