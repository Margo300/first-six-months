"use client";

import { useState } from "react";

type Props = {
  answers: Record<number, number | null>;
  onComplete: (name: string, email: string) => void;
};

export default function EmailGate({ answers, onComplete }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to continue.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          answers,
        }),
      });
    } catch {
      // Don't block the user if MailerLite fails
    }
    setLoading(false);
    onComplete(name.trim(), email.trim());
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md fade-in">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          <h2
            className="text-2xl font-normal mb-3 leading-snug"
            style={{ color: "var(--navy)" }}
          >
            Almost there
          </h2>
          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: "var(--navy-light)" }}
          >
            Enter your name and email and we will send your results to your
            inbox so you can come back to them.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
                style={{ color: "var(--navy-light)" }}
              >
                First name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-orange-300"
                style={{
                  borderColor: "#d1d5db",
                  color: "var(--navy)",
                  fontFamily: "inherit",
                }}
                autoComplete="given-name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
                style={{ color: "var(--navy-light)" }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-orange-300"
                style={{
                  borderColor: "#d1d5db",
                  color: "var(--navy)",
                  fontFamily: "inherit",
                }}
                autoComplete="email"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-3 rounded-full text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--navy)" }}
            >
              {loading ? "Just a moment…" : "See my results"}
            </button>
          </form>

          <p
            className="mt-4 text-xs leading-relaxed"
            style={{ color: "#9ca3af" }}
          >
            By continuing you agree to receive your results by email. No spam,
            ever. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
