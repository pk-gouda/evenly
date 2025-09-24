import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="site">
      {/* Top nav */}
      <header className="nav">
        <div className="container nav-row">
          <div className="logo">Evenly</div>

          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
          </nav>

          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="section hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title">
              Split expenses the smart way.
            </h1>
            <p className="hero-subtitle">
              Scan receipts (optional), itemize effortlessly, and assign items to
              people—equally or unequally. Keep groups organized and settle up in seconds.
            </p>

            <div className="cta-row">
              <Link to="/signup" className="btn btn-primary">Get started</Link>
              <a href="#how" className="btn btn-ghost">How it works</a>
            </div>

            <p className="tiny-muted">Available on web. Mobile coming soon.</p>
          </div>

          <div className="hero-visual">
            <div className="card glass">
              <div className="card-head">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="card-body">
                <div className="skeleton title" />
                <div className="skeleton line" />
                <div className="skeleton line" style={{ width: "70%" }} />
                <div className="skeleton row">
                  <div className="skeleton chip" />
                  <div className="skeleton chip" />
                  <div className="skeleton chip" />
                </div>
                <div className="skeleton box" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="section-title">Why Evenly?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧾</div>
              <h3 className="feature-title">Snap & itemize (optional)</h3>
              <p>Upload a receipt to auto-list products—or skip it and enter items manually.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3 className="feature-title">Assign by name</h3>
              <p>Tap someone to select them; tap +/– for exact shares like 0.5.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3 className="feature-title">Unequal splits</h3>
              <p>Weights, portions, or custom fractions for real-world fairness.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗂️</div>
              <h3 className="feature-title">Groups & history</h3>
              <p>All receipts in one place. Filter by group, trip, and date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <ul className="how-grid">
            <li className="step">
              <span className="step-badge">1</span>
              <div>
                <h4 className="step-title">Create or join a group</h4>
                <p>Add your friends or roommates to keep things tidy.</p>
              </div>
            </li>
            <li className="step">
              <span className="step-badge">2</span>
              <div>
                <h4 className="step-title">Upload a receipt (optional)</h4>
                <p>We list the items—edit names/prices if needed or add manually.</p>
              </div>
            </li>
            <li className="step">
              <span className="step-badge">3</span>
              <div>
                <h4 className="step-title">Assign items</h4>
                <p>Tap people to split equally, or enter fractions for custom splits.</p>
              </div>
            </li>
            <li className="step">
              <span className="step-badge">4</span>
              <div>
                <h4 className="step-title">Review & settle</h4>
                <p>See who owes what at a glance, then settle up.</p>
              </div>
            </li>
          </ul>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Link to="/signup" className="btn btn-primary">Start for free</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div>© {new Date().getFullYear()} Evenly. All rights reserved.</div>
          <nav className="footer-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Create account</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
