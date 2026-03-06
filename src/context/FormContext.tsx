"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface FormData {
  // Step 1
  startDate: string;
  paymentDeadline: string;
  mentorAssignDate: string;
  consultingDate: string;
  // Step 2
  grade: string;
  concern: string;
  concernOther: string;
  gradeAndGoal: string;
  studyHours: string;
  // Step 3
  consultation1Day: string;
  consultation1Time: string;
  consultation2Day: string;
  consultation2Time: string;
  consultation3Day: string;
  consultation3Time: string;
  // Step 4
  name: string;
  gender: string;
  phone: string;
  verificationCode: string;
  privacyAgreed: boolean;
}

const initialFormData: FormData = {
  startDate: "",
  paymentDeadline: "",
  mentorAssignDate: "",
  consultingDate: "",
  grade: "",
  concern: "",
  concernOther: "",
  gradeAndGoal: "",
  studyHours: "",
  consultation1Day: "",
  consultation1Time: "",
  consultation2Day: "",
  consultation2Time: "",
  consultation3Day: "",
  consultation3Time: "",
  name: "",
  gender: "",
  phone: "",
  verificationCode: "",
  privacyAgreed: false,
};

interface FormContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within FormProvider");
  return context;
}
