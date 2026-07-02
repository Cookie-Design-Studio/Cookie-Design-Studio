import "./pet-collar.css";

const MARQUEE_FEATURES = [
  "Marine-grade hardware",
  "Padded inner lining",
  "Machine washable",
  "Reflective stitching",
  "Vegan leather",
  "Lifetime warranty",
];

const MARQUEE_PERKS = [
  "Free shipping $50+",
  "30-day returns",
  "Size guide included",
  "Designed in Brooklyn",
];

const PRODUCTS = [
  {
    name: "Neo Collar",
    price: "From $38",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a0a4a8?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Trail Pro",
    price: "From $52",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&q=80&auto=format&fit=crop",
  },
  {
    name: "Soft Loop",
    price: "From $32",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&q=80&auto=format&fit=crop",
  },
];

const UNIT_FEATURES = [
  "Fully adjustable",
  "Quick-release buckle",
  "ID tag ring",
  "Reflective trim",
  "Soft-touch lining",
  "Weather resistant",
  "Odor resistant",
  "Lightweight build",
];

const VALUES = [
  {
    title: "For dogs",
    desc: "Bold colorways and durable hardware built for daily walks, park runs, and city life.",
  },
  {
    title: "For style",
    desc: "Trend-forward palettes that look as good on camera as they feel on every adventure.",
  },
  {
    title: "For comfort",
    desc: "Padded lining and ergonomic fit — because the walk should feel as good as it looks.",
  },
];

function ArrowDown() {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" aria-hidden="true">
      <path
        d="M14 2V34M14 34L4 24M14 34L24 24"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CtaArrow() {
  return (
    <svg className="pc-block-btn__arrow" width="18" height="17" viewBox="0 0 18 17" fill="none" aria-hidden="true">
      <path
        d="M10.87 6.45H4.27L4.29 4.79H13.71V14.22H12.05V7.63L4.87 14.81L3.7 13.63L10.87 6.45Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PetCollarHome() {
  const featureMarquee = MARQUEE_FEATURES.map((t) => `${t} · `).join("");
  const perkMarquee = MARQUEE_PERKS.map((t) => `${t} · `).join("");

  return (
    <div className="pet-collar" lang="en">
      <header className="pc-topbar">
        <div className="pc-topbar__inner">
          <a href="#top" className="pc-topbar__logo" aria-label="BIND home">
            BIND
          </a>
          <nav className="pc-topbar__nav" aria-label="Main">
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#about">About</a>
          </nav>
          <a href="#shop" className="pc-block-btn pc-block-btn--purple pc-block-btn--sm">
            <span>Shop now</span>
            <CtaArrow />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="pc-hero-full" aria-labelledby="pc-hero-title">
          <img
            className="pc-hero-full__bg"
            src="https://images.unsplash.com/photo-1583511655857-d19b40a0a4a8?w=1600&q=85&auto=format&fit=crop"
            alt=""
          />
          <div className="pc-hero-full__overlay" aria-hidden="true" />
          <div className="pc-hero-full__content">
            <h1 id="pc-hero-title" className="pc-hero-full__title">
              Collars for the walk ahead.
            </h1>
            <p className="pc-hero-full__desc">
              Trend-forward dog collars with cat-friendly sizing. Built for daily
              walks, designed to stand out.
            </p>
            <a href="#shop" className="pc-block-btn pc-block-btn--black">
              <span>Shop collars</span>
              <CtaArrow />
            </a>
          </div>
        </section>

        <section id="collections" className="pc-split">
          <div className="pc-block pc-block--yellow">
            <span className="pc-label">Collections</span>
            <h2 className="pc-block__title">
              Where every walk
              <br />
              just works
            </h2>
            <p className="pc-block__desc">
              From city strolls to trail days — BIND collars are designed around
              real routines. Dog-first fits, cat-friendly sizes, hardware that
              keeps up.
            </p>
            <div className="pc-tags">
              <span className="pc-tag pc-tag--gray">Dog collars</span>
              <span className="pc-tag pc-tag--plain">and</span>
              <span className="pc-tag pc-tag--orange">Cat collars</span>
            </div>
          </div>
          <div className="pc-split__media">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1000&q=80&auto=format&fit=crop"
              alt="Dog wearing a collar outdoors"
              loading="lazy"
            />
          </div>
        </section>

        <section className="pc-marquee-strip pc-marquee-strip--red" aria-hidden="true">
          <div className="pc-marquee-strip__track">
            <span>{featureMarquee}</span>
            <span>{featureMarquee}</span>
          </div>
        </section>

        <section id="shop" className="pc-split pc-split--reverse">
          <div className="pc-block pc-block--orange-light">
            <span className="pc-label">Best sellers</span>
            <h2 className="pc-block__title">
              One collar.
              <br />
              Full vibe.
            </h2>
            <p className="pc-block__subtitle">Premium materials, bold colorways</p>
            <p className="pc-block__desc">
              Marine-grade hardware, padded lining, and reflective details —
              everything your daily walk needs, nothing it doesn&apos;t.
            </p>
          </div>
          <div className="pc-product-blocks">
            {PRODUCTS.map((p) => (
              <article key={p.name} className="pc-product-block">
                <div className="pc-product-block__img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="pc-product-block__meta">
                  <h3>{p.name}</h3>
                  <p>{p.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pc-marquee-strip pc-marquee-strip--blue" aria-hidden="true">
          <div className="pc-marquee-strip__track pc-marquee-strip__track--green">
            <span>{perkMarquee}</span>
            <span>{perkMarquee}</span>
          </div>
        </section>

        <section className="pc-split">
          <div className="pc-block pc-block--cream">
            <span className="pc-label">Our collars</span>
            <h2 className="pc-block__title">
              Pet gear,
              <br />
              redefined.
            </h2>
            <p className="pc-block__desc">
              A new take on everyday collars — fully adjustable, move-in ready,
              designed for comfort and street style. More than a strap; it&apos;s
              part of the walk.
            </p>
            <ul className="pc-feature-grid">
              {UNIT_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#shop" className="pc-block-btn pc-block-btn--black">
              <span>View all collars</span>
              <CtaArrow />
            </a>
          </div>
          <div className="pc-gallery-wall">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a0a4a8?w=600&q=80&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
          </div>
        </section>

        <section className="pc-trio">
          <div className="pc-trio__img">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="pc-block pc-block--orange pc-trio__center">
            <span className="pc-label">Community</span>
            <h2 className="pc-block__title">
              A shared way
              <br />
              of walking
            </h2>
            <p className="pc-block__desc">
              Tag us on your daily routes. BIND is built for dogs who lead the
              pack — and cats who stroll on their own terms.
            </p>
            <a href="#about" className="pc-block-btn pc-block-btn--black">
              <span>Join the pack</span>
              <CtaArrow />
            </a>
          </div>
          <div className="pc-trio__img">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
          </div>
        </section>

        <section id="about" className="pc-arrows-bar pc-arrows-bar--blue">
          <ArrowDown />
          <h2 className="pc-arrows-bar__title">What defines us</h2>
          <ArrowDown />
        </section>

        <section className="pc-values">
          {VALUES.map((v) => (
            <article key={v.title} className="pc-value-block">
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </section>

        <a href="#shop" className="pc-strip-bar">
          <span>Shop the spring drop</span>
          <CtaArrow />
        </a>

        <section className="pc-block pc-block--purple pc-block--cta-final">
          <span className="pc-label pc-label--light">Size guide</span>
          <h2 className="pc-block__title pc-block__title--light">
            Find your fit
            <br />
            in 60 seconds
          </h2>
          <p className="pc-block__desc pc-block__desc--light">
            Match breed, neck size, and lifestyle — from city loops to trail days.
          </p>
          <a href="#shop" className="pc-block-btn pc-block-btn--green">
            <span>Start size guide</span>
            <CtaArrow />
          </a>
        </section>
      </main>

      <footer className="pc-footer-blocks">
        <div className="pc-arrows-bar pc-arrows-bar--orange">
          <ArrowDown />
          <span className="pc-arrows-bar__title">BIND</span>
          <ArrowDown />
        </div>
        <div className="pc-footer-blocks__grid">
          <div>
            <p className="pc-footer-blocks__brand">BIND</p>
            <p className="pc-footer-blocks__copy">
              Trend-forward collars for dogs and cats. Designed in Brooklyn.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li>
                <a href="#shop">Dog collars</a>
              </li>
              <li>
                <a href="#shop">Cat collars</a>
              </li>
              <li>
                <a href="#shop">Leashes</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#about">Size guide</a>
              </li>
              <li>
                <a href="#about">Shipping</a>
              </li>
              <li>
                <a href="#about">Returns</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Follow</h4>
            <ul>
              <li>
                <a href="#about">Instagram</a>
              </li>
              <li>
                <a href="#about">TikTok</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="pc-footer-blocks__legal">
          © 2026 BIND · Demo layout inspired by Units.gr color blocks
        </p>
      </footer>
    </div>
  );
}
