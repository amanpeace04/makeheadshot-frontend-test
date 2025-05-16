// File: src/app/learn-more/page.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

// import each of your use-case components:
import CorporateUseCase from "@/components/ui/home/UseCases/CorporateUseCase";
import LegalUseCase from "@/components/ui/home/UseCases/LegalUseCase";
import RealEstateUseCase from "@/components/ui/home/UseCases/RealEstateUseCase";
import FreelancersUseCase from "@/components/ui/home/UseCases/FreelancersUseCase";
import AcademicsUseCase from "@/components/ui/home/UseCases/AcademicsUseCase";
import JobSeekersUseCase from "@/components/ui/home/UseCases/JobSeekersUseCase";
import UseCaseNotFound from "@/components/ui/home/UseCases/UseCaseNotFound";

const componentMap: Record<string, React.FC> = {
  corporate: CorporateUseCase,
  legal: LegalUseCase,
  realestate: RealEstateUseCase,
  freelancers: FreelancersUseCase,
  academics: AcademicsUseCase,
  jobseekers: JobSeekersUseCase,
};

export default function LearnMorePage() {
  const params = useSearchParams();
  const id = params.get("id")?.toLowerCase() ?? "";
  const SelectedComponent = componentMap[id] || null;

  return SelectedComponent ? <SelectedComponent /> : <UseCaseNotFound />;
}
