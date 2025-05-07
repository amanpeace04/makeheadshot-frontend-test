// File: src/context/ImageValidationContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ImageValidationContextType = {
  validatedFiles: File[];
  setValidatedFiles: (files: File[]) => void;

  // new modelName state
  modelName: string;
  setModelName: (name: string) => void;
};

const ImageValidationContext = createContext<
  ImageValidationContextType | undefined
>(undefined);

export const ImageValidationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [validatedFiles, setValidatedFiles] = useState<File[]>([]);

  // hold your modelId here
  const [modelName, setModelName] = useState("");

  return (
    <ImageValidationContext.Provider
      value={{
        validatedFiles,
        setValidatedFiles,
        modelName,
        setModelName,
      }}
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
