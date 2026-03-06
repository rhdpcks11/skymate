"use client";

import { useState, useMemo } from "react";

interface CalendarProps {
  selectedDate: string;
  onSelect: (dateStr: string) => void;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function Calendar({ selectedDate, onSelect }: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun

  const isSelectableDate = useMemo(() => {
    return (date: Date): boolean => {
      // Must be Monday (1)
      if (date.getDay() !== 1) return false;
      // Must be in the future
      if (date <= today) return false;

      // The nearest next Monday: check if today is before the Sunday before that Monday
      // "차주 월요일은 이번 주 일요일 23:59까지만 선택 가능"
      // i.e., for a Monday start date, it can be selected only if today <= the Sunday before it (D-1)
      const sundayBefore = new Date(date);
      sundayBefore.setDate(sundayBefore.getDate() - 1); // Sunday before start
      sundayBefore.setHours(23, 59, 59, 999);

      return today <= sundayBefore;
    };
  }, [today]);

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월",
  ];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="glass-card-highlight p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-bold text-white">
          {viewYear}년 {monthNames[viewMonth]}
        </h3>
        <button onClick={nextMonth} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((name, i) => (
          <div key={name} className={`text-center text-xs font-medium py-1 ${i === 0 ? "text-red-400/70" : i === 6 ? "text-blue-400/70" : "text-white/40"}`}>
            {name}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} className="calendar-day" />;

          const date = new Date(viewYear, viewMonth, day);
          const dateStr = formatDate(date);
          const selectable = isSelectableDate(date);
          const isSelected = selectedDate === dateStr;
          const isToday = formatDate(today) === dateStr;

          return (
            <button
              key={dateStr}
              onClick={() => selectable && onSelect(dateStr)}
              disabled={!selectable}
              className={`calendar-day ${selectable ? "selectable" : "disabled"} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gradient-to-br from-[#4facfe] to-[#6366f1] inline-block" />
          선택 가능 (월요일)
        </span>
      </div>
    </div>
  );
}
