"use client";

import { useFormContext } from "@/context/FormContext";

const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const timeSlots = [
  "오전 10시 ~ 12시",
  "오후 12시 ~ 2시",
  "오후 2시 ~ 4시",
  "오후 4시 ~ 6시",
  "오후 6시 ~ 8시",
  "오후 8시 ~ 10시",
];

interface PriorityProps {
  rank: string;
  dayKey: "consultation1Day" | "consultation2Day" | "consultation3Day";
  timeKey: "consultation1Time" | "consultation2Time" | "consultation3Time";
}

function PrioritySelector({ rank, dayKey, timeKey }: PriorityProps) {
  const { formData, updateFormData } = useFormContext();

  return (
    <div className="glass-card-highlight p-5">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-[#4facfe] to-[#a78bfa] text-white">
          {rank}
        </span>
        <span className="text-sm font-semibold text-white/80">{rank}순위 희망 시간</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-white/40 mb-1.5">요일 선택</label>
          <select
            className="form-select"
            value={formData[dayKey]}
            onChange={(e) => updateFormData({ [dayKey]: e.target.value })}
          >
            <option value="">선택하세요</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1.5">시간대 선택</label>
          <select
            className="form-select"
            value={formData[timeKey]}
            onChange={(e) => updateFormData({ [timeKey]: e.target.value })}
          >
            <option value="">선택하세요</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default function Step3() {
  const { formData, setCurrentStep } = useFormContext();

  const isValid =
    formData.consultation1Day && formData.consultation1Time &&
    formData.consultation2Day && formData.consultation2Time &&
    formData.consultation3Day && formData.consultation3Time;

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">전화 상담 일정 선택</h2>
        <p className="text-white/50 text-sm">
          스카이메이트 코칭 등록을 위한 사전 전화 상담 시간을 선택해 주세요
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        <PrioritySelector rank="1" dayKey="consultation1Day" timeKey="consultation1Time" />
        <PrioritySelector rank="2" dayKey="consultation2Day" timeKey="consultation2Time" />
        <PrioritySelector rank="3" dayKey="consultation3Day" timeKey="consultation3Time" />
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-6 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm"
          onClick={() => setCurrentStep(2)}
        >
          이전 단계
        </button>
        <button
          className="btn-gradient"
          disabled={!isValid}
          onClick={() => setCurrentStep(4)}
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
