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
import { useImageValidation } from "@/context/ImageValidationContext";
import apiHelper from "@/helpers/apiHelper";

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

  modelId: string;
  setModelId: (v: string) => void;

  numImages: number;
  setNumImages: (n: number) => void;
  totalNumberOutputImages: number;
  setTotalNumberOutputImages: (n: number) => void;

  jobs: Job[];
  addJob: (
    clothing: string,
    background: string,
    number_of_images: number
  ) => void;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;

  validatedFiles: File[];

  submitting: boolean;
  handleSubmit: () => void;
}

const FormContext = createContext<FormContextType>({} as FormContextType);

export function MultiStepFormProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { validatedFiles, modelName } = useImageValidation();

  // Step navigation
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => setActiveStep((s) => s + 1);
  const prevStep = () => setActiveStep((s) => s - 1);

  // Personal info
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // Physical details
  const [bodyType, setBodyType] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [spectacles, setSpectacles] = useState("");

  // Professional info
  const [profession, setProfession] = useState("");
  const [_packageName, _setPackageName] = useState("");
  // AI/Image generation parameters
  const [numImages, setNumImages] = useState(0);
  const [totalNumberOutputImages, setTotalNumberOutputImages] = useState(0);

  // wrap the raw setters so we can log
  const setPackageName = (v: string) => {
    console.log("⚙️ setPackageName →", v);
    _setPackageName(v);
  };

  // Pre-fill from auth
  useEffect(() => {
    if (user) {
      console.log("user from context is :  ", user);
      setEmail(user.email);
      console.log("user from context is :  ", user.email);

      setName(user.name);
    }
  }, [user]);

  // Jobs state + helper
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

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    console.log("modelID :", modelName);
    const fd = new FormData();

    // append all your scalar fields:
    fd.append("name", name);
    fd.append("email", email);
    fd.append("age", age);
    fd.append("body_type", bodyType);
    fd.append("weight", weight);
    fd.append("height", height);
    fd.append("eye_color", eyeColor);
    fd.append("spectacles", spectacles);
    fd.append("gender", gender);
    fd.append("profession", profession);
    fd.append("package_name", _packageName);
    fd.append("model_id", modelName);

    // append the derived counts:
    fd.append("user_input_images_count", validatedFiles.length.toString());
    fd.append("total_number_output_images", totalNumberOutputImages.toString());
    fd.append("num_images", numImages.toString());

    // append jobs array:
    fd.append("jobs", JSON.stringify(jobs));

    // append each file:
    validatedFiles.forEach((f) => fd.append("files", f));

    setSubmitting(true);
    try {
      // <-- Here is the fix: send `fd` directly, not `{ body: fd }`
      await apiHelper.post("/api/upload", fd, {
        // headers: { "X-API-Key": "supersecret123" },
      });
      alert("Upload successful!");
    } catch (err) {
      console.error("Upload error:", err);
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
        setEmail,
        email,
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
        packageName: _packageName,

        setPackageName,

        numImages,
        setNumImages,
        totalNumberOutputImages,
        setTotalNumberOutputImages,
        jobs,
        addJob,
        setJobs,
        validatedFiles,
        submitting,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => useContext(FormContext);
