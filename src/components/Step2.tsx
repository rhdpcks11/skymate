"use client";

import { useFormContext } from "@/context/FormContext";

const grades = ["중1", "중2", "중3", "고1", "고2", "고3", "N수생"];
const concerns = [
  "공부 습관/루틴 형성이 어려워요",
  "성적이 정체되어 있어요",
  "어떻게 공부해야 할지 모르겠어요",
  "집중력이 부족해요",
  "목표 대학/학과를 정하지 못했어요",
  "기타 (직접 입력)",
];
const studyHours = [
  "1시간 미만",
  "1~2시간",
  "2~3시간",
  "3~4시간",
  "4~5시간",
  "5시간 이상",
];

export default function Step2() {
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const isValid = formData.grade && formData.concern && formData.studyHours &&
    (formData.concern !== "기타 (직접 입력)" || formData.concernOther.trim());

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">사전 학습 설문조사</h2>
        <p className="text-white/50 text-sm">코칭에 필요한 기본 정보를 알려주세요</p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        {/* Q1: Grade */}
        <div className="glass-card-highlight p-6">
          <label className="block text-sm font-semibold text-white/80 mb-4">
            <span className="text-[#4facfe] mr-1">Q1.</span> 현재 학년은 어떻게 되시나요?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => updateFormData({ grade: g })}
                className={`radio-option text-center text-sm ${formData.grade === g ? "selected" : ""}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Q2: Concern */}
        <div className="glass-card-highlight p-6">
          <label className="block text-sm font-semibold text-white/80 mb-4">
            <span className="text-[#4facfe] mr-1">Q2.</span> 현재 가장 큰 학습 고민은 무엇인가요?
          </label>
          <div className="space-y-2">
            {concerns.map((c) => (
              <button
                key={c}
                onClick={() => updateFormData({ concern: c })}
                className={`radio-option w-full text-left text-sm ${formData.concern === c ? "selected" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
          {formData.concern === "기타 (직접 입력)" && (
            <textarea
              className="form-input mt-3 min-h-[80px] resize-none"
              placeholder="고민을 자유롭게 적어주세요..."
              value={formData.concernOther}
              onChange={(e) => updateFormData({ concernOther: e.target.value })}
            />
          )}
        </div>

        {/* Q3: Grade and Goal */}
        <div className="glass-card-highlight p-6">
          <label className="block text-sm font-semibold text-white/80 mb-4">
            <span className="text-[#4facfe] mr-1">Q3.</span> 현재 대략적인 성적대와 목표 대학/학과가 있다면 적어주세요
          </label>
          <textarea
            className="form-input min-h-[100px] resize-none"
            placeholder="예) 현재 내신 3등급, 서울대 경영학과 목표"
            value={formData.gradeAndGoal}
            onChange={(e) => updateFormData({ gradeAndGoal: e.target.value })}
          />
        </div>

        {/* Q4: Study Hours */}
        <div className="glass-card-highlight p-6">
          <label className="block text-sm font-semibold text-white/80 mb-4">
            <span className="text-[#4facfe] mr-1">Q4.</span> 현재 하루 평균 순수 자습 시간은 얼마나 되나요?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {studyHours.map((h) => (
              <button
                key={h}
                onClick={() => updateFormData({ studyHours: h })}
                className={`radio-option text-center text-sm ${formData.studyHours === h ? "selected" : ""}`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-6 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm"
          onClick={() => setCurrentStep(1)}
        >
          이전 단계
        </button>
        <button
          className="btn-gradient"
          disabled={!isValid}
          onClick={() => setCurrentStep(3)}
        >
          다음 단계
          <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
