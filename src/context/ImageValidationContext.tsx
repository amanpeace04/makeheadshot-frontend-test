// src/context/ImageValidationContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ImageValidationContextType = {
  validatedFiles: File[];
  setValidatedFiles: (files: File[]) => void;
};

const ImageValidationContext = createContext<
  ImageValidationContextType | undefined
>(undefined);

export const ImageValidationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [validatedFiles, setValidatedFiles] = useState<File[]>([]);
  return (
    <ImageValidationContext.Provider
      value={{ validatedFiles, setValidatedFiles }}
    >
      {children}
    </ImageValidationContext.Provider>
  );
};

export function useImageValidation(): ImageValidationContextType {
  const ctx = useContext(ImageValidationContext);
  if (!ctx) {
    throw new Error(
      "useImageValidation must be used inside <ImageValidationProvider>"
    );
  }
  return ctx;
}
