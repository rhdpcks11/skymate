"use client";

import { useFormContext } from "@/context/FormContext";
import Calendar from "./Calendar";

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const ry = date.getFullYear();
  const rm = String(date.getMonth() + 1).padStart(2, "0");
  const rd = String(date.getDate()).padStart(2, "0");
  return `${ry}-${rm}-${rd}`;
}

function formatKorean(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return `${m}월 ${d}일 (${dayNames[date.getDay()]})`;
}

const timelineItems = [
  { key: "paymentDeadline", label: "결제 마감일", offset: -8, icon: "💳", desc: "시작일 D-8 (전주 일요일)" },
  { key: "mentorAssignDate", label: "멘토 배정일", offset: -5, icon: "👨‍🏫", desc: "시작일 D-5 (전주 수요일)" },
  { key: "consultingDate", label: "컨설팅 날짜", offset: -2, icon: "📋", desc: "시작일 D-2 (전주 토요일)" },
  { key: "startDate", label: "코칭 시작일", offset: 0, icon: "🚀", desc: "4주간 코칭 시작" },
];

export default function Step1() {
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const handleDateSelect = (dateStr: string) => {
    updateFormData({
      startDate: dateStr,
      paymentDeadline: addDays(dateStr, -8),
      mentorAssignDate: addDays(dateStr, -5),
      consultingDate: addDays(dateStr, -2),
    });
  };

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          스카이메이트 코칭 시작일을 선택해 주세요
        </h2>
        <p className="text-white/50 text-sm">매주 월요일 시작 / 캘린더에서 원하시는 월요일을 선택하세요</p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <Calendar selectedDate={formData.startDate} onSelect={handleDateSelect} />
      </div>

      {/* Timeline */}
      {formData.startDate && (
        <div className="animate-fadeInUp max-w-lg mx-auto mb-8">
          <h3 className="text-center text-sm font-semibold text-white/60 uppercase tracking-wider mb-6">
            자동 계산된 일정
          </h3>
          <div className="relative">
            {/* Vertical gradient line */}
            <div className="absolute left-[23px] top-2 bottom-2 timeline-line" />

            <div className="space-y-4">
              {timelineItems.map((item, idx) => {
                const dateStr = item.offset === 0 ? formData.startDate : addDays(formData.startDate, item.offset);
                return (
                  <div key={item.key} className="flex items-start gap-4 relative">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 z-10"
                      style={{
                        background: idx === timelineItems.length - 1
                          ? "linear-gradient(135deg, #4facfe, #6366f1)"
                          : "rgba(255,255,255,0.08)",
                        boxShadow: idx === timelineItems.length - 1
                          ? "0 0 20px rgba(79,172,254,0.3)"
                          : "none",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className={`glass-card-highlight flex-1 p-4 ${idx === timelineItems.length - 1 ? "gradient-border" : ""}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-white/40 mb-1">{item.desc}</p>
                          <p className="font-bold text-white">{item.label}</p>
                        </div>
                        <span className={`text-sm font-semibold ${idx === timelineItems.length - 1 ? "text-[#4facfe]" : "text-white/70"}`}>
                          {formatKorean(dateStr)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          className="btn-gradient"
          disabled={!formData.startDate}
          onClick={() => setCurrentStep(2)}
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
