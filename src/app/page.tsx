"use client";

import { FormProvider, useFormContext } from "@/context/FormContext";
import ProgressBar from "@/components/ProgressBar";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";

function FormContent() {
  const { currentStep } = useFormContext();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      {/* Background decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#4facfe] rounded-full opacity-[0.06] blur-[100px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#a78bfa] rounded-full opacity-[0.06] blur-[100px]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] bg-[#f093fb] rounded-full opacity-[0.04] blur-[100px]" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4facfe] via-[#a78bfa] to-[#f093fb] bg-clip-text text-transparent">
            SKYMATE
          </h1>
          <p className="text-white/40 text-sm mt-1">Premium Learning Coaching</p>
        </div>

        {/* Main Card */}
        <div className="glass-card p-8 md:p-10">
          <ProgressBar />

          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          &copy; 2026 Skymate. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
}
