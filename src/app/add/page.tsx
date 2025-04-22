// src/app/add/page.tsx
import { Box } from "@mui/material";
import { ProgressBar } from "@/components/steps/ProgressBar"; // ← new
import { StepOne } from "@/components/steps/StepOne";
import { StepTwo } from "@/components/steps/StepTwo";

type Props = {
  searchParams: { step?: string };
};

export default function AddPage({ searchParams }: Props) {
  const stepNum = searchParams.step === "2" ? 2 : 1;
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
