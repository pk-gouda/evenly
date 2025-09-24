import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

type Mode = "signin" | "signup";

export default function AuthPage({ initial }: { initial?: Mode }) {
  const [mode, setMode] = React.useState<Mode>(initial ?? "signin");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const nav = useNavigate();
  const location = useLocation();

  // If someone visits /auth?mode=signup or /auth?mode=signin, honor it
  React.useEffect(() => {
    const m = new URLSearchParams(location.search).get("mode");
    if (m === "signup" || m === "signin") setMode(m);
  }, [location.search]);

  const isEmail = (v: string) => /.+@.+\..+/.test(v);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!isEmail(email)) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be 6+ characters.");
    if (mode === "signup" && name.trim().length < 2)
      return setError("Please enter your name.");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    localStorage.setItem(
      "evenly:user",
      JSON.stringify({ id: "mock-uid", name: name || "You", email })
    );

    setSuccess(true);
    setLoading(false);
    setTimeout(() => nav("/dashboard"), 300);
  }

  async function signInWithGoogle() {
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem(
      "evenly:user",
      JSON.stringify({ id: "mock-google", name: "You", email: "you@gmail.com" })
    );
    setLoading(false);
    nav("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div
          className="auth-slider"
          style={{ transform: mode === "signin" ? "translateX(0%)" : "translateX(-50%)" }}
        >
          {/* SIGN IN VIEW */}
          <div className="auth-view">
            <AuthForm
              title="Sign In"
              mode="signin"
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              success={success}
              error={error}
              onSubmit={handleSubmit}
              onGoogle={signInWithGoogle}
            />
            <Overlay
              heading="Hello, Friend!"
              text="Register with your Google account or email"
              cta="SIGN UP"
              onClick={() => setMode("signup")}
            />
          </div>

          {/* SIGN UP VIEW */}
          <div className="auth-view">
            <Overlay
              heading="Welcome Back!"
              text="Sign in with Google or email"
              cta="SIGN IN"
              onClick={() => setMode("signin")}
            />
            <AuthForm
              title="Create Account"
              mode="signup"
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              success={success}
              error={error}
              onSubmit={handleSubmit}
              onGoogle={signInWithGoogle}
            />
          </div>
        </div>
      </div>

      <Link to="/" className="auth-back">← Back home</Link>
    </div>
  );
}

function AuthForm(props: {
  title: string;
  mode: Mode;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loading: boolean;
  success: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onGoogle: () => void;
}) {
  const {
    title, mode, name, setName, email, setEmail, password, setPassword,
    loading, success, error, onSubmit, onGoogle,
  } = props;

  return (
    <div className="auth-form-wrap">
      <h1 className="auth-title">{title}</h1>

      <button className="btn btn-google" onClick={onGoogle} disabled={loading}>
        {loading ? "Loading…" : "Continue with Google"}
      </button>

      <div className="divider">
        <span>{mode === "signup" ? "or create with email" : "or sign in with email"}</span>
      </div>

      <form onSubmit={onSubmit}>
        {mode === "signup" && (
          <input
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "signin" && (
          <div className="tiny-muted">Forgot Your Password?</div>
        )}

        <button
          type="submit"
          className={`btn btn-primary ${loading || success ? "btn-round" : ""}`}
          disabled={loading}
        >
          {loading ? "…" : success ? "✓" : mode === "signup" ? "SIGN UP" : "SIGN IN"}
        </button>

        {error && <div className="error-box">{error}</div>}
      </form>
    </div>
  );
}

function Overlay(props: { heading: string; text: string; cta: string; onClick: () => void }) {
  return (
    <div className="auth-overlay">
      <div className="overlay-inner">
        <h2 className="overlay-heading">{props.heading}</h2>
        <p className="overlay-text">{props.text}</p>
        <button className="btn btn-ghost" onClick={props.onClick}>
          {props.cta}
        </button>
      </div>
    </div>
  );
}
