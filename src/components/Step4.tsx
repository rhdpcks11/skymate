"use client";

import { useState } from "react";
import { useFormContext } from "@/context/FormContext";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

// Replace this with your actual Google Apps Script web app URL
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

export default function Step4() {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ phone: formatPhone(e.target.value) });
  };

  const handleSendVerification = () => {
    if (formData.phone.replace(/-/g, "").length === 11) {
      setVerificationSent(true);
      // Mock: In production, this would send an actual verification code
      alert("인증번호가 발송되었습니다. (Mock)");
    }
  };

  const isValid =
    formData.name.trim() &&
    formData.gender &&
    formData.phone.replace(/-/g, "").length === 11 &&
    formData.privacyAgreed;

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      startDate: formData.startDate,
      paymentDeadline: formData.paymentDeadline,
      mentorAssignDate: formData.mentorAssignDate,
      consultingDate: formData.consultingDate,
      grade: formData.grade,
      concern: formData.concern === "기타 (직접 입력)" ? formData.concernOther : formData.concern,
      gradeAndGoal: formData.gradeAndGoal,
      studyHours: formData.studyHours,
      consultation1: `${formData.consultation1Day} ${formData.consultation1Time}`,
      consultation2: `${formData.consultation2Day} ${formData.consultation2Time}`,
      consultation3: `${formData.consultation3Day} ${formData.consultation3Time}`,
      name: formData.name,
      gender: formData.gender,
      phone: formData.phone,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="animate-fadeInUp text-center py-12">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4facfe] to-[#a78bfa] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(79,172,254,0.4)]">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">신청이 완료되었습니다!</h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
          스카이메이트 학습 코칭 프로그램 신청이 정상적으로 접수되었습니다.<br />
          입력하신 연락처로 빠른 시일 내에 안내 드리겠습니다.
        </p>
        <div className="mt-8 glass-card-highlight inline-block px-6 py-3">
          <p className="text-sm text-white/50">코칭 시작일</p>
          <p className="text-lg font-bold text-[#4facfe]">{formData.startDate}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">신청자 정보 입력</h2>
        <p className="text-white/50 text-sm">마지막 단계입니다! 신청자 정보를 입력해 주세요</p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Name */}
        <div className="glass-card-highlight p-5">
          <label className="block text-sm font-semibold text-white/80 mb-3">이름</label>
          <input
            type="text"
            className="form-input"
            placeholder="이름을 입력해 주세요"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
          />
        </div>

        {/* Gender */}
        <div className="glass-card-highlight p-5">
          <label className="block text-sm font-semibold text-white/80 mb-3">성별</label>
          <div className="grid grid-cols-2 gap-3">
            {["남성", "여성"].map((g) => (
              <button
                key={g}
                onClick={() => updateFormData({ gender: g })}
                className={`radio-option text-center text-sm ${formData.gender === g ? "selected" : ""}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div className="glass-card-highlight p-5">
          <label className="block text-sm font-semibold text-white/80 mb-3">휴대전화 번호</label>
          <div className="flex gap-3">
            <input
              type="tel"
              className="form-input flex-1"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            <button
              onClick={handleSendVerification}
              className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
              style={{
                background: "linear-gradient(135deg, #4facfe 0%, #6366f1 100%)",
                opacity: formData.phone.replace(/-/g, "").length === 11 ? 1 : 0.4,
              }}
            >
              인증번호 받기
            </button>
          </div>
          {verificationSent && (
            <input
              type="text"
              className="form-input mt-3"
              placeholder="인증번호 6자리를 입력해 주세요"
              value={formData.verificationCode}
              onChange={(e) => updateFormData({ verificationCode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
              maxLength={6}
            />
          )}
        </div>

        {/* Privacy */}
        <div className="glass-card-highlight p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="mt-0.5">
              <input
                type="checkbox"
                className="hidden"
                checked={formData.privacyAgreed}
                onChange={(e) => updateFormData({ privacyAgreed: e.target.checked })}
              />
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                formData.privacyAgreed
                  ? "bg-gradient-to-br from-[#4facfe] to-[#6366f1] border-transparent"
                  : "border-white/20"
              }`}>
                {formData.privacyAgreed && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-white/80 font-medium">[필수] 개인정보 수집 및 이용에 동의합니다</span>
              <p className="text-xs text-white/40 mt-1">
                수집항목: 이름, 성별, 연락처, 학년, 학습 관련 정보 / 이용목적: 프로그램 상담 및 등록 안내 / 보유기간: 상담 완료 후 6개월
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-6 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm"
          onClick={() => setCurrentStep(3)}
        >
          이전 단계
        </button>
        <button
          className="btn-gradient-submit"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              제출 중...
            </span>
          ) : (
            "스카이메이트 학습 코칭 신청하기"
          )}
        </button>
      </div>
    </div>
  );
}
