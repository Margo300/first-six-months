"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DIMENSIONS, scoreDimension, Band } from "@/lib/questions";
import { getDimensionCopy } from "@/lib/results-copy";

const BAND_LABELS: Record<Band, string> = {
  "finding-it-hard": "Finding it hard",
  "in-the-middle": "In the middle",
  "largely-settled": "Largely settled",
};

const BAND_CLASS: Record<Band, string> = {
  "finding-it-hard": "band-hard",
  "in-the-middle": "band-middle",
  "largely-settled": "band-settled",
};

const BAND_DOT: Record<Band, string> = {
  "finding-it-hard": "#c0392b",
  "in-the-middle": "#eaa375",
  "largely-settled": "#27ae60",
};

function Results() {
  const params = useSearchParams();
  const name = params.get("name") ?? "";
  const raw = params.get("answers");

  let answers: Record<number, number | null> = {};
  try {
    if (raw) answers = JSON.parse(raw);
  } catch {
    // malformed — show with empty answers
  }

  const dimensionResults = DIMENSIONS.map((dim) => {
    const { band } = scoreDimension(dim.id, answers);
    const copy = getDimensionCopy(dim.id, band);
    return { dim, band, copy };
  });

  const firstName = name.split(" ")[0];

  return (
    <div className="min-h-screen px-4 py-12 md:py-16">
      <div className="w-full max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-10 fade-in">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-2"
            style={{ color: "var(--orange)" }}
          >
            North and Nimble
          </p>
          <h1
            className="text-3xl md:text-4xl font-normal mb-4 leading-snug"
            style={{ color: "var(--navy)" }}
          >
            Your results{firstName ? `, ${firstName}` : ""}
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--navy-light)" }}
          >
            Here is where you are landing across four dimensions. These results
            are a snapshot, not a fixed outcome. They reflect how things are
            feeling right now, and that will change.
          </p>
        </div>

        {/* Dimension results */}
        <div className="flex flex-col gap-6 mb-10">
          {dimensionResults.map(({ dim, band, copy }, i) => (
            <div
              key={dim.id}
              className={`rounded-2xl p-6 md:p-8 ${BAND_CLASS[band]} fade-in`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-1">
                <p
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "var(--navy-light)" }}
                >
                  Dimension {dim.id} — {dim.title}
                </p>
                <span
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-white"
                  style={{ color: "var(--navy)" }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: BAND_DOT[band] }}
                  />
                  {BAND_LABELS[band]}
                </span>
              </div>
              <h3
                className="text-lg font-normal mt-3 mb-2"
                style={{ color: "var(--navy)" }}
              >
                {copy.heading}
              </h3>
              {copy.body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed mt-2"
                  style={{ color: "var(--navy-light)" }}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Safety note */}
        <div
          className="rounded-2xl p-6 mb-8 text-sm leading-relaxed"
          style={{
            backgroundColor: "#f3f4f6",
            color: "var(--navy-light)",
            borderLeft: "4px solid #d1d5db",
          }}
        >
          If any of your reflections today have brought up feelings that go
          beyond the pressures of a new role, or if you have been finding
          things particularly hard recently, it is worth speaking to someone
          you trust. That might be your GP, a counsellor, or your
          organisation&apos;s Employee Assistance Programme if you have access
          to one. You do not need to be in crisis to seek support.
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://www.northandnimble.co.uk/coaching"
            className="flex-1 text-center px-6 py-3.5 rounded-full text-white font-medium transition-opacity hover:opacity-90 text-sm"
            style={{ backgroundColor: "var(--navy)" }}
          >
            Explore coaching with me
          </a>
          <a
            href="https://www.northandnimble.co.uk/programmes"
            className="flex-1 text-center px-6 py-3.5 rounded-full font-medium transition-colors hover:bg-white text-sm border"
            style={{
              color: "var(--navy)",
              borderColor: "var(--navy)",
              backgroundColor: "transparent",
            }}
          >
            Explore leadership programmes
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResultsClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: "var(--navy-light)" }}>Loading…</div>}>
      <Results />
    </Suspense>
  );
}
