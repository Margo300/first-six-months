"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, DEFAULT_OPTIONS, DIMENSIONS, ScaleOption } from "@/lib/questions";
import EmailGate from "@/components/EmailGate";

type Step = "intro" | "questions" | "email";

// Wrap the selected value in an object so { value: null } (N/A selected)
// is unambiguously distinct from null (nothing selected yet).
type Selection = { value: number | null } | null;

export default function Questionnaire() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [selection, setSelection] = useState<Selection>(null);

  const question = QUESTIONS[currentQ];
  const options: ScaleOption[] = question.options ?? DEFAULT_OPTIONS;
  const total = QUESTIONS.length;
  const progress = Math.round((currentQ / total) * 100);

  const dimensionTitle =
    question.dimension !== null
      ? DIMENSIONS.find((d) => d.id === question.dimension)?.title
      : null;

  function handleSelect(value: number | null) {
    setSelection({ value });
  }

  function handleNext() {
    if (selection === null) return;
    const updated = { ...answers, [question.id]: selection.value };
    setAnswers(updated);
    setSelection(null);

    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("email");
    }
  }

  function handleBack() {
    if (currentQ === 0) {
      setStep("intro");
      setSelection(null);
      return;
    }
    const prevQ = currentQ - 1;
    setCurrentQ(prevQ);
    const prevId = QUESTIONS[prevQ].id;
    // Restore previous answer if one exists (including null-valued answers like N/A)
    if (prevId in answers) {
      setSelection({ value: answers[prevId] });
    } else {
      setSelection(null);
    }
  }

  function handleEmailComplete(name: string, email: string) {
    const params = new URLSearchParams();
    params.set("name", name);
    params.set("answers", JSON.stringify(answers));
    router.push(`/results?${params.toString()}`);
  }

  if (step === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl fade-in">
          <div className="mb-8 text-center">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--orange)" }}
            >
              North and Nimble
            </p>
            <h1
              className="text-3xl md:text-4xl font-normal mb-6 leading-snug"
              style={{ color: "var(--navy)" }}
            >
              The First Six Months
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--navy-light)", fontFamily: "Georgia, serif" }}
            >
              This short check-in is for leaders in a new role or within their
              first six months. It is designed to help you take stock of where
              you are, honestly and confidentially. There are no right or wrong
              answers. It takes around five minutes.
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={() => setStep("questions")}
              className="inline-block px-8 py-3 rounded-full text-white font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--navy)", fontSize: "1rem" }}
            >
              Begin
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "email") {
    return <EmailGate answers={answers} onComplete={handleEmailComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs mb-2" style={{ color: "var(--navy-light)" }}>
            <span>
              {currentQ === 0
                ? "Opening question"
                : `Dimension ${question.dimension} of 4${dimensionTitle ? ` — ${dimensionTitle}` : ""}`}
            </span>
            <span>{currentQ + 1} / {total}</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
            <div
              className="h-1.5 rounded-full progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-6 fade-in" key={currentQ}>
          <p
            className="text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: "var(--navy)", fontFamily: "Georgia, serif" }}
          >
            {question.text}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {options.map((opt) => {
              const isSelected =
                selection !== null && selection.value === opt.value;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.value)}
                  className={`option-btn w-full text-left px-5 py-3 rounded-xl text-sm md:text-base${isSelected ? " selected" : ""}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-sm px-4 py-2 rounded-full border transition-colors hover:bg-white"
            style={{ color: "var(--navy-light)", borderColor: "#d1d5db" }}
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={selection === null}
            className="px-6 py-2.5 rounded-full text-white text-sm font-medium transition-opacity disabled:opacity-30"
            style={{ backgroundColor: "var(--navy)" }}
          >
            {currentQ < total - 1 ? "Next" : "See my results"}
          </button>
        </div>
      </div>
    </div>
  );
}
