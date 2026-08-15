import './about.css';

export default function AboutPage() {
  return (
    <main className="saffa-about">
      <header className="about-header">
        <a className="about-brand" href="/">SAFFA <span>FASHION</span></a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/grid">Collection</a>
          <a className="active" href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <a className="about-cart" href="/">Cart</a>
      </header>

      <section className="about-hero">
        <span>SAFFA FASHION · ABOUT US</span>
        <h1>Wear what<br /><em>feels like you.</em></h1>
        <p>We create modern modest fashion for women who want elegance, comfort, and individuality to exist in the same piece.</p>
      </section>

      <section className="about-story">
        <div className="about-label">01 · OUR STORY</div>
        <div className="about-copy">
          <h2>Fashion should feel personal.</h2>
          <p>Saffa Fashion was created around a simple belief: modest fashion can be refined, expressive, and effortlessly modern.</p>
          <p>Our collections focus on graceful silhouettes, thoughtful details, comfortable coverage, and pieces that can move naturally through everyday life.</p>
          <p>We are building Saffa as more than a clothing store. We are creating a brand and shopping experience where every woman can discover pieces that feel authentically hers.</p>
        </div>
      </section>

      <section className="about-values">
        <article><span>02 · VISION</span><h2>Make individuality the standard.</h2><p>Our vision is to grow Saffa Fashion into a modern fashion house where design, culture, and technology come together to create a more personal fashion experience.</p></article>
        <article><span>03 · MISSION</span><h2>Create with intention.</h2><p>Our mission is to create distinctive modest clothing with a focus on design, quality, comfort, and accessibility while continuously improving how customers discover and experience fashion online.</p></article>
      </section>

      <section className="about-philosophy">
        <span>04 · OUR PHILOSOPHY</span>
        <blockquote>“No unnecessary rules.<br />No need to fit into someone else's definition of style.”</blockquote>
        <p>Saffa exists for women who choose to define their own.</p>
      </section>

      <footer className="about-footer"><span>© Saffa Fashion</span><div><a href="/">Home</a><a href="/grid">Collection</a><a href="/contact">Contact</a></div></footer>
    </main>
  );
}
