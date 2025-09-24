import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";

function Placeholder({ title }: { title: string }) {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>{title}</h1>
        <p>Auth UI coming next…</p>
        <Link to="/" style={{ color: "#1e3a8a" }}>← Back home</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Placeholder title="Sign in" />} />
      <Route path="/signup" element={<Placeholder title="Create account" />} />
      <Route path="*" element={<Placeholder title="Not found" />} />
    </Routes>
  );
}
