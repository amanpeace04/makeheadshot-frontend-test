// File: src/context/MultiStepFormContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { Job } from "@/types";
import { useAuth } from "@/context/AuthContext";

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
  // existing helper to append a single Job
  addJob: (
    clothing: string,
    background: string,
    number_of_images: number
  ) => void;
  // new setter so you can overwrite the whole array
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;

  files: File[];
  setFiles: (files: File[]) => void;

  submitting: boolean;
  handleSubmit: () => void;
}

const FormContext = createContext<FormContextType>({} as FormContextType);

export function MultiStepFormProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
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

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      // if you have user.picture_url and want to store it:
      // setProfilePic(user.picture_url);
    }
  }, [user]);

  // Jobs state + helpers
  const [jobs, setJobs] = useState<Job[]>([]);
  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "_");

  const addJob = (
    clothing: string,
    background: string,
    number_of_images: number
  ) => {
    const combo_id = `${normalize(background)}_${normalize(clothing)}`;
    setJobs((prev) => [
      ...prev,
      { combo_id, clothing, background, number_of_images },
    ]);
  };

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const fd = new FormData();
    /* append all your fields… */
    fd.append("jobs", JSON.stringify(jobs));
    files.forEach((f) => fd.append("files", f));

    setSubmitting(true);
    try {
      await fetch("/api/upload", {
        method: "POST",
        /* … */
        body: fd,
      });
      alert("Upload successful!");
    } catch {
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
        addJob,
        setJobs, // ◀︎ expose the setter here
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
