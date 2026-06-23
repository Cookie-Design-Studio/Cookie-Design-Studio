import { useLayoutEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@cookie-design-studio/ui";
import { gsap } from "./lib/gsapSetup";

const projects = [
  {
    id: "01",
    title: "Digital Twin Command",
    meta: "Spatial intelligence / Operations",
    year: "2026",
    summary:
      "Campus, production line, and equipment data are rebuilt as readable 3D operation rooms for decision teams.",
  },
  {
    id: "02",
    title: "AIGC Brand Engine",
    meta: "Generative content / Motion system",
    year: "2026",
    summary:
      "A compact model-to-production workflow for brand visuals, campaign keyframes, and interactive launches.",
  },
  {
    id: "03",
    title: "Factory Vision Wall",
    meta: "Realtime dashboard / Data storytelling",
    year: "2025",
    summary:
      "Large-screen visualization that turns throughput, quality, and line status into one calm shared view.",
  },
] as const;

const capabilityGroups = [
  {
    title: "Strategy",
    items: ["Product narrative", "Experience mapping", "Launch storytelling", "Creative direction"],
  },
  {
    title: "Interface",
    items: ["React", "TypeScript", "Design systems", "Responsive motion"],
  },
  {
    title: "Motion & 3D",
    items: ["GSAP", "Lenis", "Three.js", "Realtime scenes"],
  },
  {
    title: "AI Production",
    items: ["AIGC workflow", "Model direction", "Asset pipelines", "Visual QA"],
  },
] as const;

const studioFacts = [
  ["03", "flagship case studies"],
  ["AI", "native creative workflow"],
  ["3D", "spatial product storytelling"],
  ["360", "iteration from concept to launch"],
] as const;

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-hero__eyebrow, .portfolio-hero__title-line, .portfolio-hero__copy", {
        y: 42,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.utils
        .toArray<HTMLElement>(".portfolio-reveal")
        .forEach((el) => {
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
          });
        });
    }, main);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div id="top" className="portfolio-shell">
      <header className="portfolio-header" aria-label="Site header">
        <a className="portfolio-header__brand" href="#top" aria-label="Cookie Design Studio home">
          Cookie Design Studio
        </a>
        <nav className="portfolio-header__nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main ref={mainRef} className="portfolio-main">
        <section className="portfolio-hero" aria-labelledby="portfolio-hero-title">
          <div className="portfolio-hero__grid" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="portfolio-hero__content">
            <p className="portfolio-hero__eyebrow">Creative AI studio / Digital intelligence</p>
            <h1 id="portfolio-hero-title" className="portfolio-hero__title">
              <span className="portfolio-hero__title-line">We build calm</span>
              <span className="portfolio-hero__title-line">digital systems</span>
              <span className="portfolio-hero__title-line">for ambitious teams.</span>
            </h1>
            <p className="portfolio-hero__copy">
              Cookie Design Studio turns complex operations, AI content workflows, and spatial
              products into memorable websites, dashboards, and launch experiences.
            </p>
          </div>
          <aside className="portfolio-hero__panel portfolio-reveal" aria-label="Studio snapshot">
            <span className="portfolio-hero__panel-mark">CDS</span>
            <p>
              Original visual direction inspired by precise portfolio rhythm, rebuilt for your own
              brand, cases, and production assets.
            </p>
          </aside>
        </section>

        <section className="portfolio-intro portfolio-reveal" aria-label="Studio introduction">
          <p className="portfolio-intro__lead">
            Basically, we make intelligent brand experiences feel simple.
          </p>
          <p className="portfolio-intro__copy">
            From first concept to production rollout, the studio connects strategy, interface,
            motion, 3D, and generative tooling into one coherent digital presence.
          </p>
        </section>

        <section id="work" className="portfolio-section portfolio-work" aria-labelledby="work-title">
          <div className="portfolio-section__head portfolio-reveal">
            <p className="portfolio-section__kicker">Selected work</p>
            <h2 id="work-title">Projects designed to explain complex systems at a glance.</h2>
          </div>
          <div className="portfolio-work__list">
            {projects.map((project) => (
              <article key={project.id} className="portfolio-work__item portfolio-reveal">
                <div className="portfolio-work__index">{project.id}</div>
                <div className="portfolio-work__body">
                  <p className="portfolio-work__meta">{project.meta}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="portfolio-work__year">{project.year}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-facts" aria-label="Studio highlights">
          {studioFacts.map(([value, label]) => (
            <div key={label} className="portfolio-facts__item portfolio-reveal">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section
          id="capabilities"
          className="portfolio-section portfolio-capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="portfolio-section__head portfolio-reveal">
            <p className="portfolio-section__kicker">Capabilities</p>
            <h2 id="capabilities-title">
              A compact stack for strategy, craft, and technical execution.
            </h2>
          </div>
          <div className="portfolio-capabilities__grid">
            {capabilityGroups.map((group) => (
              <article key={group.title} className="portfolio-capabilities__card portfolio-reveal">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="portfolio-contact" aria-labelledby="contact-title">
          <div className="portfolio-contact__inner portfolio-reveal">
            <p className="portfolio-section__kicker">Contact</p>
            <h2 id="contact-title">Ready to reshape your digital presence?</h2>
            <p>
              Bring a product, factory, campus, or AI workflow. We will turn it into a clear,
              distinctive web experience that your team can keep evolving.
            </p>
            <a href="mailto:hello@cookie-design.studio" className="portfolio-contact__link">
              hello@cookie-design.studio
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
