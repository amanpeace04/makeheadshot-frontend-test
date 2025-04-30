// File: src/context/MultiStepFormContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Job } from "@/types"; // define a Job interface centrally if needed

interface FormContextType {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
  email: string;
  setEmail: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  age: string;
  setAge: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  bodyType: string;
  setBodyType: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  eyeColor: string;
  setEyeColor: (v: string) => void;
  spectacles: string;
  setSpectacles: (v: string) => void;
  profession: string;
  setProfession: (v: string) => void;
  packageName: string;
  setPackageName: (v: string) => void;
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  submitting: boolean;
  handleSubmit: () => void;
}

const FormContext = createContext<FormContextType>({} as FormContextType);

export function MultiStepFormProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => setActiveStep((s) => s + 1);
  const prevStep = () => setActiveStep((s) => s - 1);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [bodyType, setBodyType] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [spectacles, setSpectacles] = useState("");

  const [profession, setProfession] = useState("");
  const [packageName, setPackageName] = useState("");

  const [jobs, setJobs] = useState<Job[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("email", email);
    fd.append("name", name);
    fd.append("age", age);
    fd.append("gender", gender);
    fd.append("body_type", bodyType);
    fd.append("weight", weight);
    fd.append("height", height);
    fd.append("eye_color", eyeColor);
    fd.append("spectacles", spectacles);
    fd.append("profession", profession);
    fd.append("package_name", packageName);
    fd.append("jobs", JSON.stringify(jobs));
    files.forEach((f) => fd.append("files", f));

    setSubmitting(true);
    try {
      await fetch("/api/upload", {
        method: "POST",
        headers: { "X-API-Key": "supersecret123" },
        body: fd,
      });
      alert("Upload successful!");
    } catch (e) {
      console.error(e);
      alert("Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        activeStep,
        nextStep,
        prevStep,
        email,
        setEmail,
        name,
        setName,
        age,
        setAge,
        gender,
        setGender,
        bodyType,
        setBodyType,
        weight,
        setWeight,
        height,
        setHeight,
        eyeColor,
        setEyeColor,
        spectacles,
        setSpectacles,
        profession,
        setProfession,
        packageName,
        setPackageName,
        jobs,
        setJobs,
        files,
        setFiles,
        submitting,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => useContext(FormContext);
