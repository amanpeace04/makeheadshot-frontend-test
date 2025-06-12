// src/app/add/page.tsx
import { Box } from "@mui/material";
import { ProgressBar } from "@/components/steps/ProgressBar";
import { StepOne } from "@/components/steps/StepOne";
import { StepTwo } from "@/components/steps/StepTwo";

// Next.js 15 PageProps type - searchParams is now a Promise
interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function AddPage({ searchParams }: PageProps) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;

  const step = Array.isArray(resolvedSearchParams?.step)
    ? resolvedSearchParams?.step[0]
    : resolvedSearchParams?.step;

  const stepNum = step === "2" ? 2 : 1;
  const steps = ["Who", "Package", "Upload", "Finish"];

  return (
    <Box
      sx={{
        bgcolor: "#f0f2f5",
        minHeight: "100vh",
        pt: 6,
        pb: 8,
      }}
    >
      {/* shared progress bar */}
      <ProgressBar steps={steps} activeStep={stepNum} />

      {/* step content */}
      {stepNum === 1 ? <StepOne /> : <StepTwo />}
    </Box>
  );
}
