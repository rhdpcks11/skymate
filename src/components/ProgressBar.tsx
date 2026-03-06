"use client";

import { useFormContext } from "@/context/FormContext";

const steps = [
  { num: 1, label: "시작일 선택" },
  { num: 2, label: "학습 설문" },
  { num: 3, label: "상담 일정" },
  { num: 4, label: "신청 정보" },
];

export default function ProgressBar() {
  const { currentStep } = useFormContext();
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-10">
      {/* Step indicators */}
      <div className="flex justify-between items-center mb-4 relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-white/10 mx-6" />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] mx-6 transition-all duration-500"
          style={{
            width: `calc(${progress}% - 48px)`,
            background: "linear-gradient(90deg, #4facfe, #6366f1, #a78bfa)",
          }}
        />

        {steps.map((step) => {
          const isActive = currentStep >= step.num;
          const isCurrent = currentStep === step.num;
          return (
            <div key={step.num} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCurrent
                    ? "bg-gradient-to-br from-[#4facfe] to-[#6366f1] text-white shadow-[0_0_20px_rgba(79,172,254,0.4)]"
                    : isActive
                    ? "bg-gradient-to-br from-[#4facfe] to-[#a78bfa] text-white"
                    : "bg-white/10 text-white/30"
                }`}
              >
                {isActive && currentStep > step.num ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium transition-colors ${
                  isActive ? "text-white/90" : "text-white/30"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="progress-bg">
        <div className="progress-fill" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
      </div>
    </div>
  );
}
