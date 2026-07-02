import "./pet-collar.css";

const MARQUEE_ITEMS = [
  "Free shipping over $50",
  "Lifetime hardware warranty",
  "Vegan leather options",
  "Designed in Brooklyn",
  "30-day easy returns",
];

const PRODUCTS = [
  {
    name: "Neo Collar",
    meta: "Dogs · S–L",
    price: "$38",
    tag: "Bestseller",
    tagVariant: "accent" as const,
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a0a4a8?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Trail Pro",
    meta: "Dogs · M–XL",
    price: "$52",
    tag: "New",
    tagVariant: "new" as const,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Soft Loop",
    meta: "Cats · XS–M",
    price: "$32",
    tag: null,
    tagVariant: null,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Reflect 360",
    meta: "Dogs · All sizes",
    price: "$45",
    tag: "Outdoor",
    tagVariant: "accent" as const,
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&auto=format&fit=crop",
  },
];

const FEATURES = [
  {
    icon: "◎",
    title: "Built to last",
    desc: "Marine-grade hardware and reinforced stitching for everyday walks and wild adventures.",
  },
  {
    icon: "✦",
    title: "Comfort first",
    desc: "Padded inner lining and adjustable fit — no rubbing, no slipping, all-day ease.",
  },
  {
    icon: "↻",
    title: "Easy care",
    desc: "Machine-washable materials. Wipe clean in seconds between muddy park runs.",
  },
];

export function PetCollarHome() {
  const marqueeText = MARQUEE_ITEMS.map((t) => `${t} · `).join("");

  return (
    <div className="pet-collar" lang="en">
      <header className="pc-header">
        <div className="pc-header__inner">
          <a href="#top" className="pc-logo" aria-label="BIND home">
            BIND
          </a>
          <nav className="pc-nav" aria-label="Main">
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#about">About</a>
            <a href="#journal">Journal</a>
          </nav>
          <div className="pc-header__actions">
            <button type="button" className="pc-btn pc-btn--ghost pc-btn--sm">
              Sign in
            </button>
            <button type="button" className="pc-btn pc-btn--primary pc-btn--sm">
              Cart (0)
            </button>
            <button
              type="button"
              className="pc-menu-toggle"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="pc-hero" aria-labelledby="pc-hero-title">
          <div className="pc-hero__copy">
            <span className="pc-hero__badge">Spring drop — live now</span>
            <h1 id="pc-hero-title" className="pc-hero__title">
              Collars built for
              <br />
              <em>the walk ahead.</em>
            </h1>
            <p className="pc-hero__desc">
              Trend-forward dog collars with cat-friendly sizing. Premium materials,
              bold colorways, and hardware that keeps up with every adventure.
            </p>
            <div className="pc-hero__ctas">
              <a href="#shop" className="pc-btn pc-btn--primary">
                Shop dog collars
              </a>
              <a href="#collections" className="pc-btn pc-btn--ghost">
                View collections
              </a>
            </div>
          </div>
          <div className="pc-hero__visual">
            <img
              className="pc-hero__img"
              src="https://images.unsplash.com/photo-1583511655857-d19b40a0a4a8?w=900&q=85&auto=format&fit=crop"
              alt="Golden retriever wearing a colorful collar on a walk"
              width={900}
              height={1125}
              fetchPriority="high"
            />
            <span className="pc-hero__tag">Neo Collar · Coral</span>
          </div>
        </section>

        <div className="pc-marquee" aria-hidden="true">
          <div className="pc-marquee__track">
            <span className="pc-marquee__item">{marqueeText}</span>
            <span className="pc-marquee__item">{marqueeText}</span>
          </div>
        </div>

        <section id="shop" className="pc-section" aria-labelledby="pc-shop-title">
          <div className="pc-section__head">
            <h2 id="pc-shop-title" className="pc-section__title">
              Best sellers
            </h2>
            <a href="#shop" className="pc-section__link">
              View all →
            </a>
          </div>
          <div className="pc-products">
            {PRODUCTS.map((p) => (
              <article key={p.name} className="pc-product">
                <div className="pc-product__img-wrap">
                  <img
                    className="pc-product__img"
                    src={p.image}
                    alt={p.name}
                    width={600}
                    height={600}
                    loading="lazy"
                  />
                  {p.tag ? (
                    <span
                      className={`pc-product__tag${p.tagVariant === "new" ? " pc-product__tag--new" : ""}`}
                    >
                      {p.tag}
                    </span>
                  ) : null}
                </div>
                <div className="pc-product__body">
                  <h3 className="pc-product__name">{p.name}</h3>
                  <p className="pc-product__meta">{p.meta}</p>
                  <p className="pc-product__price">{p.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="collections"
          className="pc-section"
          aria-labelledby="pc-collections-title"
        >
          <div className="pc-section__head">
            <h2 id="pc-collections-title" className="pc-section__title">
              Shop by pet
            </h2>
          </div>
          <div className="pc-collections">
            <a href="#shop" className="pc-collection pc-collection--dog">
              <img
                className="pc-collection__img"
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80&auto=format&fit=crop"
                alt=""
                loading="lazy"
              />
              <div className="pc-collection__content">
                <p className="pc-collection__label">Primary</p>
                <h3 className="pc-collection__title">Dog collars</h3>
                <span className="pc-collection__cta">Shop dogs →</span>
              </div>
            </a>
            <a href="#shop" className="pc-collection pc-collection--cat">
              <img
                className="pc-collection__img"
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80&auto=format&fit=crop"
                alt=""
                loading="lazy"
              />
              <div className="pc-collection__content">
                <p className="pc-collection__label">Also available</p>
                <h3 className="pc-collection__title">Cat collars</h3>
                <span className="pc-collection__cta">Shop cats →</span>
              </div>
            </a>
          </div>
        </section>

        <section id="about" className="pc-section" aria-labelledby="pc-features-title">
          <div className="pc-section__head">
            <h2 id="pc-features-title" className="pc-section__title">
              Why BIND
            </h2>
          </div>
          <div className="pc-features">
            {FEATURES.map((f) => (
              <div key={f.title} className="pc-feature">
                <span className="pc-feature__icon" aria-hidden="true">
                  {f.icon}
                </span>
                <h3 className="pc-feature__title">{f.title}</h3>
                <p className="pc-feature__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pc-cta-band">
          <h2 className="pc-cta-band__title">Find the perfect fit in 60 seconds</h2>
          <p className="pc-cta-band__desc">
            Use our size guide to match breed, neck measurement, and lifestyle —
            from city strolls to trail days.
          </p>
          <button type="button" className="pc-btn pc-btn--primary">
            Start size guide
          </button>
        </div>
      </main>

      <footer className="pc-footer">
        <div className="pc-footer__inner">
          <div>
            <p className="pc-footer__brand">BIND</p>
            <p className="pc-footer__tagline">
              Trend-forward collars for dogs and cats. Designed for daily walks,
              built for the long haul.
            </p>
          </div>
          <div className="pc-footer__col">
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
              <li>
                <a href="#shop">Bundles</a>
              </li>
            </ul>
          </div>
          <div className="pc-footer__col">
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
              <li>
                <a href="#about">Contact</a>
              </li>
            </ul>
          </div>
          <div className="pc-footer__col">
            <h4>Follow</h4>
            <ul>
              <li>
                <a href="#journal">Instagram</a>
              </li>
              <li>
                <a href="#journal">TikTok</a>
              </li>
              <li>
                <a href="#journal">Newsletter</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="pc-footer__bottom">
          © 2026 BIND. Demo homepage — color palette adapted from Units Parkside.
        </p>
      </footer>
    </div>
  );
}
