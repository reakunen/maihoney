import Image from "next/image";
import ShopActions from "./shop-actions";

const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
    <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
  </svg>
);

const HoneycombMark = ({ light = false }: { light?: boolean }) => (
  <svg aria-hidden="true" className="brand-mark" viewBox="0 0 54 46" fill="none">
    <path d="m15 2 10 5.8v11.5L15 25 5 19.3V7.8L15 2Z" fill={light ? "#FFE08A" : "#F5B400"} />
    <path d="m39 2 10 5.8v11.5L39 25 29 19.3V7.8L39 2Z" fill={light ? "#FFF2C7" : "#FFD75A"} />
    <path d="m27 21 10 5.8v11.5L27 44l-10-5.7V26.8L27 21Z" fill={light ? "#F5B400" : "#22271F"} />
  </svg>
);

const Flower = () => (
  <svg aria-hidden="true" className="flower-sketch" viewBox="0 0 140 140" fill="none">
    <path d="M69 131c2-36 1-63-2-84M69 78c-15-6-25-15-31-27M69 94c16-7 27-17 34-30" stroke="currentColor" strokeWidth="2" />
    <path d="M67 48c-15-3-23-12-22-24 11-3 20 2 26 14 5-14 14-20 25-18 3 12-4 22-18 28 13 7 18 17 14 28-12 1-21-6-25-20-7 13-17 18-28 14-1-12 7-21 28-22Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="announcement">
        <span>Small-batch honey from San Lorenzo, California</span>
        <a href="#shop">Shop the harvest <span aria-hidden="true">→</span></a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Mai Honey home">
          <span>mai</span>honey
          <HoneycombMark />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#story">Our story</a>
          <a href="#process">Our process</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="nav-cta" href="#shop">
          Shop honey
          <ArrowUpRight />
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="#shop">Shop</a>
            <a href="#story">Our story</a>
            <a href="#process">Our process</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Backyard honey · San Lorenzo</p>
            <h1>Pure honey.<br /><em>Close to home.</em></h1>
            <p className="hero-intro">
              Raw, unfiltered honey made in small seasonal batches by a father-and-son beekeeping team.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#shop">Shop the 16 oz bottle <ArrowUpRight /></a>
              <a className="text-link" href="#story">Meet the beekeepers <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-note">
              <strong>Harvested here.</strong>
              <span>Three hives · April–October</span>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/assets/hives-hero.jpg"
              alt="A Mai Honey beekeeper inspecting a frame beside the backyard hives"
              fill
              priority
              sizes="(max-width: 850px) 100vw, 56vw"
            />
            <div className="hero-stamp"><span>100%</span>raw + unfiltered</div>
            <div className="hero-caption"><span>01</span><p>Our backyard apiary<br />San Lorenzo, CA</p></div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Product highlights">
          <p><span>01</span> Raw &amp; unfiltered</p>
          <p><span>02</span> Family tended</p>
          <p><span>03</span> Locally harvested</p>
          <p><span>04</span> Small seasonal batches</p>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading shop-heading">
            <div>
              <p className="eyebrow"><span /> This season&apos;s harvest</p>
              <h2>Golden, floral,<br /><em>honestly local.</em></h2>
            </div>
            <p>Each bottle carries the character of our neighborhood in bloom—subtly changing with the seasons, always bottled raw.</p>
          </div>

          <div className="product-layout">
            <div className="product-gallery">
              <div className="product-main-image">
                <span className="image-label">16 oz · 453 g</span>
                <Image src="/assets/honey-bottle.png" alt="Mai Honey 16 ounce squeeze bottle" fill sizes="(max-width: 850px) 90vw, 42vw" />
              </div>
              <div className="product-secondary-image">
                <Image src="/assets/honey-closeup.jpg" alt="Two bottles of Mai Honey glowing in natural sunlight" fill sizes="(max-width: 850px) 35vw, 16vw" />
              </div>
              <div className="scribble" aria-hidden="true">from our<br />backyard →</div>
            </div>

            <div className="product-info">
              <p className="product-kicker">Small-batch · Raw · Unfiltered</p>
              <h3>Backyard Honey</h3>
              <div className="price-row"><span className="price">$16</span><span>16 oz bottle</span></div>
              <p className="product-description">
                Pure honey gathered from flowers around San Lorenzo and bottled without filtering away its natural character. Rich, bright, and made for everything from morning toast to evening tea.
              </p>
              <ul className="product-points">
                <li><span>Origin</span><strong>San Lorenzo, California</strong></li>
                <li><span>Ingredients</span><strong>100% pure honey</strong></li>
                <li><span>Ships in</span><strong>5–7 business days</strong></li>
              </ul>
              <ShopActions />
              <p className="pickup-note">Local to the East Bay? <a href="mailto:contact@maihoney.com?subject=Mai Honey local pickup">Ask about pickup</a> and skip shipping.</p>
            </div>
          </div>
        </section>

        <section className="story-section" id="story">
          <div className="story-image-wrap">
            <Image src="/assets/hive-detail.jpg" alt="An open backyard beehive full of honeybees" fill sizes="(max-width: 850px) 100vw, 52vw" />
            <span className="story-image-number">02 / OUR STORY</span>
          </div>
          <div className="story-copy">
            <Flower />
            <p className="eyebrow"><span /> Father, son, three hives</p>
            <h2>Twenty years of care,<br /><em>one bottle at a time.</em></h2>
            <p className="story-lead">Chris learned the rhythm of the hive over two decades. Now he shares that knowledge with his son Brian—tending their backyard colonies with patience, respect, and a lot of curiosity.</p>
            <blockquote>“Our honey tastes like this place because it comes from this place.”</blockquote>
            <div className="people">
              <div className="person">
                <Image src="/assets/chris.jpg" alt="Chris, beekeeper and dad" width={80} height={80} />
                <p><strong>Chris</strong><span>Beekeeper dad</span></p>
              </div>
              <div className="person">
                <Image src="/assets/brian.jpg" alt="Brian, beekeeper and son" width={80} height={80} />
                <p><strong>Brian</strong><span>Beekeeper son</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="process-intro">
            <p className="eyebrow eyebrow-light"><span /> From bloom to bottle</p>
            <h2>Nothing added.<br /><em>Nothing rushed.</em></h2>
            <p>We let the bees and the seasons lead. Our job is to care for the colonies and keep the honey as close to the hive as possible.</p>
          </div>
          <div className="process-steps">
            <article><span className="step-number">01</span><div className="step-icon flower-icon" aria-hidden="true">✦</div><h3>Local forage</h3><p>Our bees gather nectar from flowers growing throughout the San Lorenzo neighborhood.</p></article>
            <article><span className="step-number">02</span><div className="step-icon" aria-hidden="true">⬡</div><h3>Seasonal harvest</h3><p>We typically harvest from April through October, only when the hives have honey to share.</p></article>
            <article><span className="step-number">03</span><div className="step-icon drop-icon" aria-hidden="true">●</div><h3>Bottled raw</h3><p>No filler and no over-processing—just pure, unfiltered honey with its natural character intact.</p></article>
          </div>
        </section>

        <section className="journal-section">
          <div className="journal-copy">
            <p className="eyebrow"><span /> A living harvest</p>
            <h2>No two seasons<br /><em>taste exactly alike.</em></h2>
            <p>Color, aroma, and flavor shift as different plants bloom. That variation isn&apos;t a flaw—it&apos;s the signature of real local honey.</p>
            <a className="text-link" href="#faq">Learn about raw honey <span aria-hidden="true">→</span></a>
          </div>
          <div className="journal-image">
            <Image src="/assets/honey-closeup.jpg" alt="Mai Honey bottles in warm sunlight" fill sizes="(max-width: 850px) 100vw, 54vw" />
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-heading">
            <p className="eyebrow"><span /> Good to know</p>
            <h2>Questions,<br /><em>answered.</em></h2>
            <p>Still curious? We&apos;re happy to talk bees, honey, or local pickup.</p>
            <a href="mailto:contact@maihoney.com" className="button button-outline">Ask us anything <ArrowUpRight /></a>
          </div>
          <div className="faq-list">
            <details open><summary>What does raw and unfiltered mean?<span>+</span></summary><p>Our honey is bottled without fine filtering, so it keeps more of the pollen, aroma, and character that make each harvest unique.</p></details>
            <details><summary>Why did my honey crystallize?<span>+</span></summary><p>Crystallization is natural and often happens faster with raw honey. Place the closed bottle in warm—not boiling—water and let it loosen gradually.</p></details>
            <details><summary>Where does the honey come from?<span>+</span></summary><p>It comes from three hives in our San Lorenzo backyard. The bees forage among local flowers across the surrounding neighborhood.</p></details>
            <details><summary>Can I pick up my order locally?<span>+</span></summary><p>Yes. Contact us before ordering and we&apos;ll help arrange local pickup so you can avoid shipping fees.</p></details>
            <details><summary>How should I store it?<span>+</span></summary><p>Keep honey sealed at room temperature in a dry spot. Refrigeration isn&apos;t needed and will make crystallization happen sooner.</p></details>
          </div>
        </section>

        <section className="newsletter" id="contact">
          <HoneycombMark light />
          <p className="eyebrow eyebrow-light"><span /> Stay close to the hive</p>
          <h2>Know when a fresh<br /><em>batch is ready.</em></h2>
          <p>Seasonal harvest notes, local pickup updates, and the occasional story from our backyard.</p>
          <form className="newsletter-form" action="mailto:contact@maihoney.com" method="post">
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" name="email" type="email" placeholder="Your email address" required />
            <button type="submit">Join the list <span aria-hidden="true">→</span></button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand brand-light" href="#top"><span>mai</span>honey <HoneycombMark light /></a>
          <p>Pure backyard honey from a father-and-son team in San Lorenzo, California.</p>
        </div>
        <div className="footer-links">
          <div><span>Explore</span><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#faq">FAQ</a></div>
          <div><span>Contact</span><a href="tel:+15105010079">(510) 501-0079</a><a href="mailto:contact@maihoney.com">contact@maihoney.com</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Mai Honey</span><span>San Lorenzo, CA · Save the bees</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </>
  );
}
